const { before, after, test } = require("node:test");
const assert = require("node:assert/strict");
const { readFile } = require("node:fs/promises");
const { join } = require("node:path");
const { chromium } = require("playwright");

let browser, server, address;
before(async () => {
  const { createAppServer } = await import("../scripts/serve.mjs");
  server = createAppServer({
    fixture: await readFile(join(__dirname, "fixtures/client.js")),
    transformHtml: (html) =>
      html.replace(
        /<script\s+src="https:\/\/cdn.jsdelivr.net\/npm\/@supabase[\s\S]*?<\/script>/,
        '<script src="/__test-client.js"></script>',
      ),
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  address = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHANNEL
      ? { channel: process.env.PLAYWRIGHT_CHANNEL }
      : {}),
  });
});
after(async () => {
  await browser?.close();
  if (server) await new Promise((resolve) => server.close(resolve));
});

async function openApp(
  t,
  { mobile = false, role = "admin", remember = false } = {},
) {
  const page = await browser.newPage({
    viewport: mobile
      ? { width: 390, height: 844 }
      : { width: 1440, height: 1000 },
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route(/https:\/\/[^/]+\.supabase\.co\//, (route) => {
    errors.push("Tentativa de acesso ao backend real durante teste");
    return route.abort();
  });
  t.after(async () => {
    await page.close();
    assert.deepEqual(errors, [], "Erros inesperados no navegador");
  });
  await page.goto(address, { waitUntil: "networkidle" });
  await page.evaluate((value) => {
    window.__testRole = value;
  }, role);
  await page.locator("#email").fill("teste@acervo.invalid");
  await page.locator("#password").fill("Teste@123!!");
  await page.locator("#rememberSession").setChecked(remember);
  await page.locator("#loginButton").click();
  await page.locator("#app").waitFor({ state: "visible" });
  await page.waitForFunction(
    () =>
      document.getElementById("accountRole").textContent !== "Acesso ao Acervo",
  );
  return page;
}

async function checkLayout(page) {
  const result = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
    return {
      overflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
      duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
      dialogs: [...document.querySelectorAll("dialog[open]")].map((dialog) => ({
        inside:
          dialog.getBoundingClientRect().left >= 0 &&
          dialog.getBoundingClientRect().right <= innerWidth,
        overflow: dialog.scrollWidth > dialog.clientWidth + 1,
        mainCount: dialog.querySelectorAll(":scope > .acervo-dialog-main")
          .length,
        sideCount: dialog.querySelectorAll(":scope > .acervo-dialog-side")
          .length,
      })),
    };
  });
  assert.equal(result.overflow, false);
  assert.deepEqual(result.duplicateIds, []);
  for (const dialog of result.dialogs) {
    assert.equal(dialog.inside, true);
    assert.equal(dialog.overflow, false);
    assert.equal(dialog.mainCount, 1);
    assert.equal(dialog.sideCount, 1);
  }
}

for (const mobile of [false, true]) {
  test(`consulta, edição, movimentações e pessoas (${mobile ? "celular" : "PC"})`, async (t) => {
    const page = await openApp(t, { mobile });
    await checkLayout(page);
    await page.evaluate(() => showTab("browse"));
    await page.locator("#search").fill("Monitor de teste");
    assert.equal(await page.evaluate(() => filtered().length), 1);
    await page.locator("#search").fill("");
    await page.evaluate(() => {
      expanded = 1;
      renderList();
    });
    await checkLayout(page);
    await page.evaluate(() => startEdit(rows.find((row) => row.id === 1)));
    assert.equal(
      await page.locator("#editItem").inputValue(),
      "Monitor de teste",
    );
    await checkLayout(page);
    await page.evaluate(() => {
      $("editDialog").close();
      finishEdit();
    });
    for (const [action, id] of [
      ["emprestar", 1],
      ["descarte_estoque", 2],
      ["baixar", 1],
    ]) {
      await page.evaluate(
        ([action, id]) =>
          openOperation(
            action,
            rows.find((row) => row.id === id),
          ),
        [action, id],
      );
      await checkLayout(page);
      assert.equal(
        (await page
          .locator("#operation .acervo-dialog-side h2")
          .textContent()) === "",
        false,
      );
      await page.evaluate(() => $("operation").close());
    }
    await page.evaluate(() => $("manageAccess").click());
    await page
      .locator("#peopleList")
      .getByText("Outra pessoa", { exact: true })
      .waitFor();
    await checkLayout(page);
    await page.locator("#addPerson").click();
    await page.locator("#newUserName").fill("Pessoa fictícia");
    await page.locator("#newUserEmail").fill("nova@acervo.invalid");
    await checkLayout(page);
    await page.locator("#newUserSave").click();
    await page.locator("#newUserResult").waitFor({ state: "visible" });
    assert.equal(
      await page.locator("#createdUserEmail").inputValue(),
      "nova@acervo.invalid",
    );
    await checkLayout(page);
    await page.evaluate(() => $("userAccessDialog").close());
    await page.evaluate(() => showTab("dashboard"));
    await checkLayout(page);
    await page.evaluate(() => $("logout").click());
    await page.locator("#login").waitFor({ state: "visible" });
    assert.deepEqual(
      await page.evaluate(() => ({
        last: lastSuccess,
        count: rows.length,
        preview: nextInternalPreview(),
      })),
      { last: null, count: 0, preview: "" },
    );
  });
}

test("sugestões acessíveis por setas, Enter, Escape e Tab", async (t) => {
  const page = await openApp(t);
  await page
    .locator("#rooms label")
    .filter({ hasText: "Sala Principal" })
    .click();
  const item = page.locator("#item");
  await item.fill("Mon");
  assert.equal(await item.getAttribute("role"), "combobox");
  assert.equal(await item.getAttribute("aria-expanded"), "true");
  await item.press("ArrowDown");
  const active = await item.getAttribute("aria-activedescendant");
  assert.equal(await page.locator(`#${active}`).getAttribute("role"), "option");
  assert.equal(
    await page.locator(`#${active}`).getAttribute("aria-selected"),
    "true",
  );
  assert.equal(
    await item.evaluate((node) => node === document.activeElement),
    true,
  );
  await item.press("Enter");
  assert.equal(await item.inputValue(), "Monitor de teste");
  assert.equal(await item.getAttribute("aria-expanded"), "false");
  await item.fill("Mon");
  await item.press("ArrowUp");
  await item.press("Escape");
  assert.equal(await item.getAttribute("aria-activedescendant"), null);
  assert.equal(await item.getAttribute("aria-expanded"), "false");
  await item.fill("Mon");
  await item.press("Tab");
  assert.equal(await item.getAttribute("aria-expanded"), "false");
});

test("pop-up mantém uma estrutura ao alternar larguras", async (t) => {
  const page = await openApp(t);
  await page.locator("#manageAccess").click();
  await page.locator("#addPerson").click();
  for (const width of [390, 1440, 320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.waitForTimeout(120);
    await checkLayout(page);
    await page.locator("#newUserName").fill(`Largura ${width}`);
    assert.equal(
      await page
        .locator("#userAccessDialog .acervo-dialog-side h2")
        .textContent(),
      "Adicionar pessoa",
    );
  }
});

test("fechar exclusão de pessoa retorna à lista de pessoas", async (t) => {
  const page = await openApp(t, { mobile: true });
  await page.evaluate(() => $("manageAccess").click());
  await page
    .locator("#peopleList")
    .getByText("Outra pessoa", { exact: true })
    .waitFor();
  await page.evaluate(() =>
    confirmPersonRemoval(peopleRows.find((person) => person.id !== user.id)),
  );
  await page.locator("#deletePersonDialog").waitFor({ state: "visible" });
  await page.locator("#cancelPersonDelete").click();
  await page.locator("#userAccessDialog").waitFor({ state: "visible" });
  await page
    .locator("#peopleList")
    .getByText("Outra pessoa", { exact: true })
    .waitFor();
  await checkLayout(page);
});

test("perfil leitor consulta sem habilitar ações de alteração", async (t) => {
  const page = await openApp(t, { role: "leitor" });
  assert.equal(await page.locator("#manageAccess").isVisible(), false);
  assert.equal(
    await page.locator("#fields").evaluate((node) => node.disabled),
    true,
  );
  assert.equal(await page.locator("#save").isDisabled(), true);
  await page.evaluate(() => {
    startEdit(rows[0]);
    openOperation("emprestar", rows[0]);
  });
  assert.equal(await page.locator("dialog[open]").count(), 0);
  assert.equal(
    await page.evaluate(() =>
      window.__testCalls.some((call) => call.name === "acervo_gravar_v3"),
    ),
    false,
  );
});

for (const remember of [false, true]) {
  test(`sessão usa ${remember ? "localStorage" : "sessionStorage"} e é removida ao sair`, async (t) => {
    const page = await openApp(t, { remember });
    const stores = await page.evaluate(() => ({
      local: !!localStorage.getItem(AUTH_KEY),
      session: !!sessionStorage.getItem(AUTH_KEY),
    }));
    assert.deepEqual(stores, { local: remember, session: !remember });
    await page.locator("#logout").click();
    await page.locator("#login").waitFor({ state: "visible" });
    assert.deepEqual(
      await page.evaluate(() => ({
        local: localStorage.getItem(AUTH_KEY),
        session: sessionStorage.getItem(AUTH_KEY),
      })),
      { local: null, session: null },
    );
  });
}

test("sessão salva inválida volta ao login sem erro não tratado", async (t) => {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  t.after(() => page.close());
  await page.route(/https:\/\/[^/]+\.supabase\.co\//, (route) => route.abort());
  await page.addInitScript(() => {
    window.__testRestoreSession = true;
    window.__testVerifyError = true;
  });
  await page.goto(address, { waitUntil: "networkidle" });
  assert.equal(await page.locator("#login").isVisible(), true);
  assert.match(
    await page.locator("#loginMessage").textContent(),
    /verificar sua sessão/,
  );
  assert.equal(await page.locator("#app").isVisible(), false);
  assert.deepEqual(errors, []);
});

test("exportação gera uma planilha Excel com os dados da consulta", async (t) => {
  const page = await openApp(t);
  await page.waitForFunction(() => !!window.ExcelJS);
  const downloadPromise = page.waitForEvent("download", { timeout: 30000 });
  await page.evaluate(() => exportExcel(true));
  const download = await downloadPromise;
  assert.match(download.suggestedFilename(), /Inventário Completo.*\.xlsx$/);
  const buffer = await readFile(await download.path());
  assert.equal(buffer.subarray(0, 2).toString(), "PK");
  const sheets = await page.evaluate(async (base64) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(
      Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)),
    );
    return workbook.worksheets.map((sheet) => ({
      name: sheet.name,
      rows: sheet.rowCount,
    }));
  }, buffer.toString("base64"));
  assert.ok(sheets.some((sheet) => sheet.name === "Resumo"));
  assert.ok(sheets.some((sheet) => sheet.rows >= 5));
});
