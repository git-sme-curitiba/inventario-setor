"use strict";

const $ = (id) => document.getElementById(id);
const ROOMS = ["Sala Principal", "Sala da Gerência", "Almoxarifado"];
const CATEGORIES = ["Móvel", "Tecnologia", "Material"];
const TYPE = {
  PMC: "Patrimônio PMC",
  ICI: "Etiqueta ICI",
  SEM_IDENTIFICACAO: "Sem identificação",
};
const STATUS = {
  ATIVO: "Ativo",
  EMPRESTADO: "Emprestado",
  BAIXADO: "Descartado",
  ARQUIVADO: "Arquivado",
};
const ACTION = {
  emprestar: "Emprestar",
  devolver: "Registrar devolução",
  entrada: "Entrada de estoque",
  saida: "Saída de estoque",
  descarte_estoque: "Descartar quantidade",
  baixar: "Registrar descarte",
  estornar: "Reverter descarte",
  arquivar: "Arquivar",
  restaurar: "Restaurar",
};

const CATEGORY_ICON = {
  "Móvel": "furniture",
  Tecnologia: "technology",
  Material: "materials",
};
const ROOM_ICON = {
  "Sala Principal": "room",
  "Sala da Gerência": "management",
  Almoxarifado: "shelf",
};
const TYPE_ICON = {
  PMC: "pmc",
  ICI: "ici",
  SEM_IDENTIFICACAO: "none",
};
const ACTION_ICON = {
  emprestar: "loan",
  devolver: "return",
  entrada: "stock-in",
  saida: "stock-out",
  descarte_estoque: "discard",
  baixar: "writeoff",
  estornar: "reverse",
  arquivar: "archive",
  restaurar: "restore",
};
const ZONE = "America/Sao_Paulo";

try {
  localStorage.removeItem("sb-yipfkwxhpahpuiizkcny-auth-token");
  localStorage.removeItem(
    "sb-yipfkwxhpahpuiizkcny-auth-token-code-verifier",
  );
} catch {}

const db = window.supabase?.createClient(
  "https://yipfkwxhpahpuiizkcny.supabase.co",
  "sb_publishable_WSiEY5i1VJfNoAZ_KwUp8Q_HkmeMdlI",
  {
    auth: {
      storage: sessionStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  },
);
let user = null,
  role = "leitor",
  rows = [],
  checks = [],
  busy = false,
  pending = null,
  page = 1,
  expanded = null,
  editor = null;
let action = "",
  selected = null,
  scene = null,
  refreshTask = null,
  pollTimer = null,
  toastTimer,
  lastSnapshot = "",
  lastSuccess = null;
let learnedKey = "",
  manual = {
    categoria: false,
    tipo: false,
    controle: false
  },
  scanTarget = "code";
let barcodeWorker = null,
  barcodeTask = null,
  ocrPromise = null,
  ocrBusy = false,
  barcodeBusy = false;
let filters = {
  controle: "",
  ambiente: "",
  categoria: "",
  tipo: "",
  situacao: "",
  estante: "",
  prateleira: "",
  dia: "",
  item: "",
};
const internal = (id) => "ACV-" + String(id).padStart(5, "0");

function nextInternalPreview() {
  if (!lastSuccess && !rows.length) return "";
  const last = rows.reduce((max, row) => {
    const id = Number(row.id);
    return Number.isSafeInteger(id) && id > max ? id : max;
  }, 0);
  return Number.isSafeInteger(last + 1) ? internal(last + 1) : "";
}

const clean = (s) =>
  String(s || "")
  .trim()
  .replace(/\s+/g, " ");
const key = (s) =>
  clean(s)
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();
const shortEmail = (s) =>
  String(s || "")
  .split("@")[0]
  .toLocaleUpperCase("pt-BR");
const value = (name) =>
  document.querySelector('[name="' + name + '"]:checked')?.value || "";
const type = () => value("type");
const dateBR = (v) =>
  v
  ? new Intl.DateTimeFormat("pt-BR", {
    timeZone: ZONE,
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date(v))
  : "";
const dayKey = (v) => {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .formatToParts(new Date(v))
    .map((x) => [x.type, x.value]),
  );
  return p.year + "-" + p.month + "-" + p.day;
};
const today = () => dayKey(new Date());

function el(tag, text, cls) {
  const n = document.createElement(tag);
  if (text !== undefined) n.textContent = text;
  if (cls) n.className = cls;
  return n;
}

function icon(name) {
  const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  n.setAttribute("class", "icon");
  n.setAttribute("viewBox", "0 0 24 24");
  n.setAttribute("aria-hidden", "true");
  const u = document.createElementNS(n.namespaceURI, "use");
  u.setAttribute("href", "#i-" + name);
  n.append(u);
  return n;
}

function acervoBooks(settled = false) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "acervo-books" + (settled ? " is-settled" : ""));
  svg.setAttribute("viewBox", "0 0 72 54");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = '<g fill="currentColor" fill-opacity=".09" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><g class="acervo-book"><rect x="10" y="23" width="13" height="24" rx="2.8"/><path d="M14 29h5M14 33h5"/></g><g class="acervo-book"><rect x="29" y="13" width="13" height="34" rx="2.8"/><path d="M33 19h5M33 23h5M33 27h5"/></g><g class="acervo-book"><rect x="48" y="18" width="13" height="29" rx="2.8"/><path d="M52 24h5M52 28h5"/></g><path d="M7 50h57" fill="none"/></g>';
  return svg;
}

function acervoLoader(message, compact = false) {
  const loader = el("div", undefined, "acervo-loader" + (compact ? " compact" : ""));
  loader.setAttribute("role", "status");
  loader.append(acervoBooks(), el("span", message));
  return loader;
}

function acervoEmpty(title, description) {
  const state = el("div", undefined, "acervo-empty");
  state.append(acervoBooks(true), el("strong", title), el("p", description));
  return state;
}

function syncFieldIdentity(root = document) {
  root.querySelectorAll('#register input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"]), #register textarea, #editFields input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"]), #editFields textarea, #userAccessDialog input:not([type="radio"]):not([type="hidden"])').forEach(n => {
    n.dataset.acervoFilled = String(!!String(n.value).trim());
  });
}

let acervoSyncGeneration = 0;

function setAcervoSync(active, message = "Vamos ver o que mudou por aqui.", opening = false, token = null) {
  if (!active && token !== null && token !== acervoSyncGeneration) return;
  const generation = ++acervoSyncGeneration;
  const b = $("refresh");
  b.classList.toggle("is-syncing", active);
  b.setAttribute("aria-busy", String(active));
  b.disabled = active || busy;
  b.querySelector(":scope > .acervo-books")?.remove();
  if (active) b.prepend(acervoBooks());
  $("acervoOpening").hidden = !active;
  if (active) {
    const loader = acervoLoader(message);
    if (opening) {
      const text = loader.lastElementChild;
      const title = el("strong", "Seu acervo está chegando.");
      text.prepend(title);
    }
    $("acervoOpening").replaceChildren(loader);
  } else $("acervoOpening").replaceChildren();
  return generation;
}

function showAcervoReceipt(record, template) {
  const discarded = record.situacao === "BAIXADO",
    saved = $("saved");
  const row = el("div", undefined, "acervo-receipt"),
    place = el("div", undefined, "receipt-place"),
    card = el("div", undefined, "receipt-card"),
    copy = el("div", undefined, "receipt-copy");
  place.setAttribute("aria-hidden", "true");
  card.append(icon(discarded ? "discard" : "record-add"), el("i"));
  place.append(card);
  copy.append(el("strong", discarded ? "Descarte registrado." : "Pronto. Mais um bem no seu lugar."), el("p", internal(record.id) + " · " + record.dados.item), el("small", [record.dados.ambiente, locationText(record)].filter(Boolean).join(" · ")));
  row.append(place, copy);
  saved.classList.toggle("is-discarded", discarded);
  saved.replaceChildren(row, button("Cadastrar outro igual", () => repeatRegistration(template), "", "copy"));
  saved.hidden = false;
}

function labelButton(n, text, name) {
  n.replaceChildren();
  const loading = /[…]|\.\.\.$/.test(text) && ["clock", "lock"].includes(name);
  n.classList.toggle("has-books-loader", loading);
  n.setAttribute("aria-busy", String(loading));
  if (loading) n.append(acervoBooks());
  else if (name) n.append(icon(name));
  n.append(document.createTextNode(text));
}

function setHelpHint(n, text, name) {
  const cue = icon(name);
  cue.classList.add("help-cue");
  n.classList.add("help-hint");
  n.replaceChildren(el("span", text), cue);
}

function button(text, fn, cls = "", name = "") {
  const n = el("button", undefined, cls);
  n.type = "button";
  labelButton(n, text, name);
  n.onclick = fn;
  return n;
}

function toast(text, error = false) {
  $("toast").replaceChildren(error ? icon("warning") : acervoBooks(true), el("span", text));
  $("toast").className = "toast" + (error ? " error" : "");
  $("toast").hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ($("toast").hidden = true), 6000);
}

function storage(name, data) {
  try {
    if (!user?.id) return arguments.length === 1 ? null : false;
    const k = "acervo2:" + user?.id + ":" + name;
    if (arguments.length === 1)
    return JSON.parse(localStorage.getItem(k) || "null");
    if (data === null) localStorage.removeItem(k);
    else localStorage.setItem(k, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

async function rpc(name, args = {}) {
  if (mustChangePassword(user)) {
    showFirstAccess();
    throw Error("Crie sua senha pessoal para continuar.");
  }
  if (!db) throw Error("Conexão indisponível. Atualize a página.");
  const {
    data,
    error
  } = await db.rpc(name, args);
  if (error) {
    if (String(error.message || "").includes("ACERVO_TROCA_SENHA_OBRIGATORIA")) {
      user = {
        ...user,
        app_metadata: {
          ...user?.app_metadata,
          acervo_primeiro_acesso: true
        }
      };
      showFirstAccess();
      throw Error("Crie sua senha pessoal para continuar.");
    }
    throw error;
  }
  return data;
}

function setChoice(name, v) {
  document
    .querySelectorAll('[name="' + name + '"]')
    .forEach((n) => (n.checked = n.value === String(v || "")));
}

function choices(
  target,
  name,
  options,
  chosen = "",
  onchange = () => {},
  required = true,
) {
  target.replaceChildren(
    ...options.map((o) => {
      const [v, text, ico] = Array.isArray(o) ? o : [o, o, ""];
      const l = el("label", undefined, "choice"),
      i = el("input"),
      s = el("span");
      i.type = "radio";
      i.name = name;
      i.value = v;
      i.checked = v === chosen;
      i.required = required;
      i.setAttribute(
        "aria-label",
        name.includes("Shelf") || name === "shelf"
        ? "Estante " + text
        : name.includes("Level") || name === "level"
        ? "Prateleira " + text
        : text,
      );
      if (ico) s.append(icon(ico));
      s.append(document.createTextNode(text));
      i.onchange = onchange;
      l.append(i, s);
      return l;
    }),
  );
}

function updateNavIndicator(animate = true) {
  const nav = document.querySelector(".nav");
  const lens = nav?.querySelector(".nav-lens");
  const current = nav?.querySelector('[aria-current="page"]');
  if (!lens || !current || !nav.offsetWidth) return;
  lens.style.transition =
    animate && lens.dataset.ready &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "" : "none";
  lens.style.width = current.offsetWidth + "px";
  lens.style.height = current.offsetHeight + "px";
  lens.style.transform =
    `translate(${current.offsetLeft}px, ${current.offsetTop}px)`;
  lens.dataset.ready = "true";
  nav.classList.add("has-lens");
}

function showTab(id) {
  document
    .querySelectorAll("main>section")
    .forEach((s) => (s.hidden = s.id !== id));
  document.querySelectorAll("[data-tab]").forEach((b) => {
    if (b.dataset.tab === id) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
  updateNavIndicator();
}

function setBusy(v, message = "Salvando…") {
  busy = v;
  $("fields").disabled = v || role === "leitor" || !!pending;
  document
    .querySelectorAll("#app button,#operation button,#registrationDiscardDialog button")
    .forEach((b) => (b.disabled = v));
  if ($("editFields"))
  $("editFields").disabled = v || role === "leitor" || !!pending;
  $("save").disabled = v || role === "leitor" || !!pending;
  $("logout").disabled = v;
  $("refresh").disabled = v;
  $("manageAccess").disabled = v;
  $("pendingBox").hidden = !pending;
  $("retry").disabled = v;
  labelButton($("save"), v ? message : "Cadastrar", v ? "clock" : "save");
  $("discardRegistration").disabled = v || role === "leitor" || !!pending;
  $("directReason").disabled = v;
  $("previous").disabled = v || page <= 1;
  $("next").disabled =
    v || page >= Math.max(1, Math.ceil(filtered().length / 25));
}

function locationText(r) {
  const d = r.dados;
  return d.estante && d.prateleira
    ? d.estante + " · " + String(d.prateleira).padStart(2, "0")
    : r.legado?.localizacao || "";
}

const CONTROL = [
  ["INDIVIDUAL", "Individual", "individual"],
  ["QUANTIDADE", "Por quantidade", "stock"],
];

function registrationGroupHeading(id, label, description, symbol) {
  const heading = el("div", undefined, "registration-group-heading"),
    text = el("div");
  heading.id = id;
  text.append(el("strong", label), el("p", description));
  heading.append(icon(symbol), text);
  return heading;
}

function organizeEditor(record) {
  const fields = $("editFields"),
    oldGrid = fields.querySelector(".grid2");
  const item = el("div", undefined, "editor-item"),
    name = el("div", undefined, "editor-name-card");
  const category = $("editCategories").closest("fieldset");
  category.classList.remove("spaced");
  category.classList.add("editor-category-card");
  category.querySelector("legend").prepend(icon("composition"));
  name.append($("editItem").previousElementSibling, $("editItem"));
  name.querySelector("label").prepend(icon("draft"));
  item.append(name, category);
  const location = el("div", undefined, "editor-location"),
    room = $("editRooms").closest("fieldset");
  room.classList.remove("spaced");
  room.querySelector("legend").prepend(icon("pin"));
  location.append(room, $("editLocation"));
  const identity = $("editTypes").closest("fieldset");
  identity.id = "editIdentityGroup";
  identity.classList.remove("spaced");
  identity.querySelector("legend").after(registrationGroupHeading("editIdentityHeading", "Identificação", "Qual código identifica o item?", "code"));
  identity.append($("editCodeWrap"));
  const control = el("div");
  control.id = "editControlHost";
  control.append(registrationGroupHeading("editControlHeading", "Controle", "Como acompanhar o item?", "stock"));
  const stock = record.controle === "QUANTIDADE",
    value = el("div");
  value.id = "editControlValue";
  value.append(icon(stock ? "stock" : "individual"), el("span", stock ? "Por quantidade" : "Individual"));
  control.append(value);
  control.classList.toggle("editor-stock", stock);
  identity.hidden = stock;
  const notes = el("div", undefined, "editor-note");
  notes.append($("editNote").previousElementSibling, $("editNote"));
  const grid = el("div", undefined, "editor-grid");
  grid.append(item, identity, control, notes);
  fields.prepend(location, grid);
  oldGrid.remove();
}

function mountControlFields(host, prefix = "", record = null) {
  if (!host) return;
  const e = prefix === "edit";
  const id = (s) => (e ? "edit" + s[0].toUpperCase() + s.slice(1) : s);
  const box = el("div", undefined, "stock-control");
  const group = el("fieldset"),
    opts = el("div", undefined, "choices");
  group.append(el("legend", "Controle"), opts);
  choices(
    opts,
    e ? "editControl" : "control",
    CONTROL,
    record?.controle || "INDIVIDUAL",
    () => {
      if (!e) manual.controle = true;
      syncControl(prefix);
    },
  );
  if (e) {
    group.disabled = true;
    box.append(
      el(
        "p",
        "Tipo de controle definido no cadastro.",
        "hint",
      ),
    );
  }
  box.append(group);
  const hint = el("p", "", "hint");
  hint.id = id("controlHint");
  box.append(hint);
  const stock = el("div", undefined, "grid2");
  stock.id = id("stockFields");
  const input = (parent, name, label, type, initial, attrs = {}) => {
    const wrap = el("div"),
      l = el("label", label),
      n = el("input");
    n.id = id(name);
    n.type = type;
    n.value = initial;
    l.htmlFor = n.id;
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    wrap.append(l, n);
    parent.append(wrap);
    return n;
  };
  const qty = input(
    stock,
    "quantity",
    e ? "Saldo atual" : "Quantidade inicial",
    "number",
    record?.saldo ?? 1,
    {
      min: 0,
      max: 99999999999,
      step: "0.001"
    },
  );
  qty.readOnly = e;
  const unit = el("input");
  unit.id = id("unit");
  unit.type = "hidden";
  unit.value = record?.unidade || "unidade";
  unit.disabled = e;
  stock.append(unit);
  const extras = el("div");
  input(
    extras,
    "minimum",
    "Estoque mínimo",
    "number",
    record?.minimo ?? 0,
    {
      min: 0,
      max: 99999999999,
      step: "0.001"
    },
  );
  stock.append(extras);
  box.append(stock);
  if (e) host.append(box);
  else host.replaceChildren(box);
  syncControl(prefix);
}

function syncControl(prefix = "") {
  const e = prefix === "edit",
    id = (s) => (e ? "edit" + s[0].toUpperCase() + s.slice(1) : s);
  const box = $(id("stockFields"));
  if (!box) return;
  const stock = value(e ? "editControl" : "control") === "QUANTIDADE";
  box.hidden = !stock;
  box.querySelectorAll("input").forEach((n) => {
    n.disabled = !stock;
    n.required = stock && n.id === id("quantity");
  });
  $(id("unit")).disabled = !stock || e;
  if (!e) {
    $("itemForm").classList.toggle("quantity-layout", stock);
    if (stock) setChoice("type", "SEM_IDENTIFICACAO");
    $("types").hidden = stock;
    const identity = $("identityBlock");
    if (identity) {
      if (stock) $("stockFields").after(identity);
      else if (identity.parentElement !== $("formRest")) $("formRest").prepend(identity);
    }
    $("types").closest("fieldset").querySelector("legend").textContent = stock ? "Código automático" : "Identificação";
    syncCode();
    updateRegistrationSummary();
  }
  const room = value(e ? "editRoom" : "room");
  setHelpHint(
    $(id("controlHint")),
    stock
    ? room && room !== "Almoxarifado"
    ? "Estoque por quantidade: selecione Almoxarifado. O ambiente não será trocado automaticamente."
    : e ? "Saldo ajustado em Movimentações" : "Saldo em unidades"
    : e ? "Individual" : "Um registro para cada bem",
    stock ? "stock" : "individual",
  );
  $(id("controlHint")).dataset.help = stock
    ? "Um registro reúne várias unidades. As saídas reduzem o saldo. Disponível no almoxarifado."
    : "Cada bem tem seu próprio código, movimentações e histórico.";
  $(id("controlHint")).tabIndex = 0;
}

function syncDirectDown() {
  $("directDown").checked = false;
  $("itemForm").classList.remove("disposal");
  $("directReason").required = false;
  labelButton($("save"), "Cadastrar", "save");
  updateRegistrationSummary();
}

function openRegistrationDiscard() {
  if (busy || role === "leitor") return;
  if (pending) return toast("Conclua a operação pendente primeiro.", true);
  if (!$("itemForm").reportValidity()) return;
  const d = formData();
  if (!validateRecord(d)) return;
  const place = d.ambiente === "Almoxarifado"
    ? `${d.ambiente} · ${d.estante} / ${String(d.prateleira).padStart(2,"0")}` : d.ambiente;
  $("registrationDiscardItem").replaceChildren(
    el("strong", d.item),
    el("span", (d.controle === "QUANTIDADE" ? quantityText(d.quantidade, d.unidade) : "1 bem individual") + " · " + place),
  );
  $("registrationDiscardDialog").showModal();
  $("directReason").focus();
}

function movementActions(r) {
  if (r.situacao === "EMPRESTADO") return ["devolver", "baixar"];
  if (r.situacao !== "ATIVO") return [];
  return r.controle === "QUANTIDADE"
    ? ["entrada", "saida", "descarte_estoque", "baixar"]
    : ["emprestar", "baixar"];
}

function quantityText(amount, unit = "unidade") {
  const n = Number(amount),
    plural = {
      unidade: "unidades",
      rolo: "rolos",
      metro: "metros",
      litro: "litros",
      caixa: "caixas",
      kg: "kg"
    };
  return n.toLocaleString("pt-BR", {
    maximumFractionDigits: 3
  }) + " " + (n === 1 ? unit : plural[unit] || unit);
}

function renderMovementResults() {
  if (!$("moveResults")) return;
  const q = key($("moveSearch").value);
  const exact = rows.filter(r => q && (key(r.dados.codigo) === q || key(internal(r.id)) === q));
  const found = exact.length ? exact : rows.filter(r => q && key([
    r.dados.item, r.dados.codigo, internal(r.id), r.dados.ramal,
  ].join(" ")).includes(q));
  $("moveResults").replaceChildren();
  $("moveMissing").hidden = !q || found.length > 0;
  $("createDown").hidden = role === "leitor";
  if (!q) {
    const empty = el("div", undefined, "movement-empty");
    empty.append(icon("search"), el("span", "Encontre o item para ver as ações disponíveis."));
    $("moveResults").append(empty);
    return;
  }
  for (const r of found.slice(0, 20)) {
    const card = el("div", undefined, "movement-result");
    const heading = el("div", undefined, "movement-result-heading");
    heading.append(el("h3", r.dados.item), el("span", STATUS[r.situacao],
      "badge" + (r.situacao === "BAIXADO" ? " down" : r.situacao === "ARQUIVADO" ? " archive" : "")));
    card.append(heading, el("p", [internal(r.id), r.dados.codigo ? r.dados.tipo + " " + r.dados.codigo : ""].filter(Boolean).join(" · "), "movement-code"));
    const position = locationText(r);
    card.append(el("p", [r.dados.ambiente, position].filter(Boolean).join(" · "), "hint movement-location"));
    if (r.controle === "QUANTIDADE") card.append(el("p", "Saldo: " + quantityText(r.saldo, r.unidade), "notice"));
    if (r.emprestimo) card.append(el("p", `Com ${r.emprestimo.responsavel} · ${r.emprestimo.destino}`, "notice"));
    const actions = el("div", undefined, "actions");
    if (role !== "leitor") for (const a of movementActions(r)) actions.append(button(
      ACTION[a], () => openOperation(a, r), a === "baixar" || a === "descarte_estoque" ? "danger" : "", ACTION_ICON[a],
    ));
    if (role === "leitor") card.append(el("p", "Seu perfil permite consultar este item.", "hint"));
    else if (!actions.children.length) card.append(el("p", r.situacao === "ARQUIVADO" ? "Registro arquivado. Abra os detalhes na consulta para restaurar." : "Item descartado. Consulte os detalhes para ver o motivo e o histórico.", "hint"));
    card.append(actions);
    $("moveResults").append(card);
  }
  if (found.length > 20) $("moveResults").append(el("p", `${found.length} itens encontrados. Digite mais detalhes para refinar.`, "hint"));
}

function configureMovement(a, r) {
  const quantity = ["entrada", "saida", "descarte_estoque"].includes(a),
    person = ["emprestar", "saida"].includes(a);
  for (const [wrap, id, on] of[
    ["moveQuantityWrap", "moveQuantity", quantity],
    ["movePersonWrap", "movePerson", person],
    ["moveDestinationWrap", "moveDestination", person],
  ]) {
    $(wrap).hidden = !on;
    $(id).disabled = !on;
    $(id).required = on;
    $(id).value = "";
  }
  $("movePersonLabel").textContent =
    a === "saida" ? "Solicitante" : "Responsável";
  $("moveQuantity").step = ["unidade", "rolo", "caixa"].includes(
    r.unidade,
  )
    ? "1"
    : "0.001";
  $("moveQuantity").min = $("moveQuantity").step;
  $("moveQuantity").max =
    a === "entrada" ? "99999999999" : String(r.saldo);
  const updateBalance = () => {
    const n = Number($("moveQuantity").value || 0);
    $("moveBalance").textContent =
      `Saldo atual: ${quantityText(r.saldo,r.unidade)}. Após confirmar: ${quantityText(Number((Number(r.saldo) + (a === "entrada" ? n : -n)).toFixed(3)),r.unidade)}.`;
  };
  $("moveQuantity").oninput = updateBalance;
  updateBalance();
  $("reason").required = [
    "baixar",
    "descarte_estoque",
    "estornar",
    "arquivar",
    "restaurar",
  ].includes(a);
  $("reason").previousElementSibling.textContent = ["baixar", "descarte_estoque"].includes(a)
    ? "Motivo do descarte" : $("reason").required ? "Motivo / justificativa" : "Observação · opcional";
  $("downDate").required = a === "baixar";
  $("downDate").disabled = a !== "baixar";
  $("downFields").hidden = a !== "baixar";
  const hints = {
    emprestar: "Informe quem ficará com o bem e onde ele será usado.",
    devolver: `O bem voltará para ${r.dados.ambiente}${locationText(r) ? " · " + locationText(r) : ""}.`,
    entrada: "Informe quantas unidades entraram no estoque.",
    saida: "Informe a quantidade, quem retirou e o destino.",
    descarte_estoque: "Desconte do saldo apenas as unidades descartadas.",
    baixar: `O registro continuará no acervo como Descartado, com motivo e histórico${r.controle === "QUANTIDADE" ? `. Todo o saldo (${quantityText(r.saldo,r.unidade)}) será descartado` : ""}.`,
    arquivar: "Ação descontinuada. Registros antigos permanecem preservados.",
    restaurar: "Devolve o registro arquivado à lista corrente.",
    estornar: "Use para corrigir um descarte registrado por engano. O histórico será preservado.",
  };
  $("operationHint").textContent = hints[a] || "Confira os dados antes de confirmar.";
  labelButton($("confirmOperation"), ACTION[a], ACTION_ICON[a]);
}

function validScanValue(v) {
  return scanTarget === "moveSearch"
    ? /^\d{6}$/.test(v) || /^ACV-\d+$/i.test(v)
    : /^\d{6}$/.test(v);
}

function syncLocation(prefix = "") {
  const edit = prefix === "edit",
    room = value(edit ? "editRoom" : "room"),
    shelf = value(edit ? "editShelf" : "shelf"),
    level = value(edit ? "editLevel" : "level");
  const target = $(edit ? "editLocation" : "location");
  if (!target) return;
  const warehouse = room === "Almoxarifado";
  target.hidden = !warehouse;
  if (!edit) $("itemForm").classList.toggle("warehouse-layout", warehouse);
  target.querySelectorAll("input").forEach((i) => {
    i.required = warehouse;
    i.disabled = !warehouse;
  });
  $(edit ? "editPosition" : "position").textContent =
    shelf && level
    ? shelf + " · " + level.padStart(2, "0")
    : "Escolha a posição";
}

function syncCode(prefix = "") {
  const edit = prefix === "edit",
    t = value(edit ? "editType" : "type"),
    n = $(edit ? "editCode" : "code"),
    none = t === "SEM_IDENTIFICACAO";
  if (!none && n.readOnly) n.value = "";
  $(edit ? "editCodeWrap" : "codeWrap").hidden = !t;
  if (!edit && $("identityBlock")) {
    $("identityBlock").dataset.type = t;
    $("types").querySelectorAll("input").forEach(input => input.setAttribute("aria-controls", "codeWrap"));
  }
  $(edit ? "editCodeLabel" : "codeLabel").textContent = !edit && value("control") === "QUANTIDADE"
    ? "Código automático" : none ? "Identificação interna" : TYPE[t] || "Identificação";
  n.required = !!t && !none;
  n.readOnly = none;
  n.pattern = none ? "ACV-[0-9]{5,}" : "[0-9]{6}";
  n.maxLength = none ? 64 : 6;
  $(edit ? "editScan" : "scan").hidden = none || !mobileCamera();
  n.placeholder = none ? "Código automático" : "6 números da etiqueta";
  if (none) n.value = edit && editor?.id
    ? internal(editor.id) : nextInternalPreview();
  const help = $(edit ? "editCodeHint" : "codeHint");
  setHelpHint(
    help,
    none && !edit && n.value ? "Código previsto" : "Sobre o código",
    none ? "sequence" : "code",
  );
  help.dataset.help = none
    ? edit
    ? "Código interno deste registro."
    : "Prévia calculada pelo último registro disponível. O banco confirma o número ao salvar; ele pode mudar se houver outro cadastro ou lacunas na sequência."
    : "PMC e ICI usam seis números. Os zeros à esquerda são preservados.";
  help.tabIndex = 0;
}

function syncForm() {
  const ready = clean($("item").value).length >= 2;
  $("formRest").hidden = !ready;
  $("notesBlock").hidden = !ready;
  $("registrationSave").hidden = !ready;
  syncCode();
  syncLocation();
  syncControl();
  updateRegistrationSummary();
  syncFieldIdentity();
}

function winner(list, field) {
  const count = new Map();
  for (const r of list) {
    const v =
      field === "controle" ? r.controle || "INDIVIDUAL" : r.dados[field];
    if (v) count.set(v, (count.get(v) || 0) + 1);
  }
  const ranks = [...count].sort((a, b) => b[1] - a[1]);
  return list.length >= 2 &&
    ranks[0] &&
    ranks[0][1] / list.length >= 0.6 &&
    ranks[0][1] > (ranks[1]?.[1] || 0)
    ? ranks[0][0]
    : "";
}

function learnItem() {
  const current = key($("item").value);
  if (current !== learnedKey) {
    manual = {
      categoria: false,
      tipo: false,
      controle: false
    };
    learnedKey = current;
    setChoice("category", "");
    setChoice("type", "");
    setChoice("control", "INDIVIDUAL");
  }
  const matches = rows.filter(
    (r) => r.situacao !== "ARQUIVADO" && key(r.dados.item) === current,
  );
  const cat = winner(matches, "categoria"),
    ident = winner(matches, "tipo");
  if (!manual.categoria) setChoice("category", cat);
  if (!manual.tipo) setChoice("type", ident);
  const control = winner(matches, "controle");
  if (!manual.controle && control) setChoice("control", control);
  const suggestions = [];
  if (control && !manual.controle)
  suggestions.push(
    control === "QUANTIDADE" ? "Por quantidade" : "Individual",
  );
  if (cat && !manual.categoria) suggestions.push(cat);
  if (ident && !manual.tipo) suggestions.push(TYPE[ident]);
  setHelpHint(
    $("learningHint"),
    suggestions.length
    ? "Sugestão aplicada"
    : matches.length
    ? "Escolha as opções abaixo."
    : "Novo item",
    "suggestion",
  );
  $("learningHint").dataset.help = suggestions.length
    ? "Com base em " +
    matches.length +
    " registros: " +
    suggestions.join(" · ") +
    ". Todas as opções podem ser alteradas."
    : "Escolha um nome existente ou cadastre um novo. As sugestões se baseiam no histórico do inventário.";
  $("learningHint").tabIndex = 0;
  syncForm();
}

function suggestions() {
  const q = key($("item").value),
    names = new Map();
  rows.forEach((r) => {
    if (r.situacao !== "ARQUIVADO")
    names.set(key(r.dados.item), r.dados.item);
  });
  const found = [...names.values()]
    .filter((n) => key(n).includes(q))
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .slice(0, 8);
  $("suggestions").replaceChildren(
    ...found.map((n) =>
      button(
        n,
        () => {
          $("item").value = n;
          learnItem();
          $("suggestions").hidden = true;
          $("item").setAttribute("aria-expanded", "false");
          saveDraft();
        },
        "",
        "suggestion",
      ),
    ),
  );
  $("suggestions").hidden = !found.length;
  $("item").setAttribute("aria-expanded", String(!!found.length));
}

function formData(prefix = "") {
  const e = prefix === "edit",
    room = value(e ? "editRoom" : "room"),
    t = value(e ? "editType" : "type");
  return {
    ambiente: room,
    categoria: value(e ? "editCategory" : "category"),
    item: clean($(e ? "editItem" : "item").value),
    tipo: t,
    codigo:
    t === "SEM_IDENTIFICACAO" ? "" : $(e ? "editCode" : "code").value,
    estante:
    room === "Almoxarifado" ? value(e ? "editShelf" : "shelf") : "",
    prateleira:
    room === "Almoxarifado" ? value(e ? "editLevel" : "level") : "",
    observacao: $(e ? "editNote" : "note").value.trim(),
    controle: value(e ? "editControl" : "control") || "INDIVIDUAL",
    quantidade: $(e ? "editQuantity" : "quantity")?.value || "1",
    unidade: $(e ? "editUnit" : "unit")?.value || "unidade",
    minimo: $(e ? "editMinimum" : "minimum")?.value || "0",
    ramal: e
    ? rows.find((r) => r.id === editor?.id)?.dados?.ramal || ""
    : "",
  };
}

function updateRegistrationSummary() {
  if (!$("registrationSummary")) return;
  const d = formData();
  const stock = d.controle === "QUANTIDADE";
  const summary = $("registrationSummary");
  if (!clean(d.item)) {
    summary.replaceChildren(el("span", "Preencha a ficha para conferir o registro."));
    return;
  }
  const down = $("directDown").checked;
  const heading = el("div", undefined, "summary-heading");
  const title = el("div", undefined, "summary-title");
  title.append(el("strong", d.item));
  const status = el("span", down ? "Descartado" : "Ativo", "summary-status");
  status.append(icon(down ? "discard" : "check"));
  heading.append(title, status);
  const facts = el("dl", undefined, "summary-facts");
  function fact(label, text, detail) {
    const wrap = el("div");
    const val = el("dd", text);
    if (label === "Localização") {
      val.classList.add("location-ticket");
      val.prepend(icon("pin"));
    }
    if (detail) val.append(el("small", detail));
    wrap.append(el("dt", label), val);
    facts.append(wrap);
  }
  const amount = Number(d.quantidade);
  fact("Quantidade", stock
    ? d.quantidade === "" ? "A informar" : `${Number.isFinite(amount) ? amount.toLocaleString("pt-BR", { maximumFractionDigits: 3 }) : d.quantidade} ${amount === 1 ? "unidade" : "unidades"}`
    : "1 bem individual");
  const automatic = stock || d.tipo === "SEM_IDENTIFICACAO";
  const preview = automatic ? nextInternalPreview() : "";
  fact(automatic && preview ? "Código previsto" : "Identificação", automatic
    ? preview || "Gerado ao salvar"
    : d.tipo ? `${d.tipo} ${d.codigo || "a informar"}` : "A selecionar");
  fact("Localização", d.ambiente || "A selecionar",
    d.ambiente === "Almoxarifado"
    ? `Estante ${d.estante || "a selecionar"} · Prateleira ${d.prateleira || "a selecionar"}`
    : "");
  summary.replaceChildren(heading, facts);
}

function repeatRegistration(d) {
  if (
    clean($("item").value) &&
    !confirm("Substituir o rascunho por outro item igual?")
  )
  return;
  resetForm();
  $("item").value = d.item;
  for (const [name, field] of[
    ["category", "categoria"],
    ["type", "tipo"],
    ["room", "ambiente"],
    ["shelf", "estante"],
    ["level", "prateleira"],
    ["control", "controle"],
  ])
  setChoice(name, d[field]);
  $("minimum").value = d.minimo || "0";
  manual = {
    categoria: true,
    tipo: true,
    controle: true
  };
  learnedKey = key(d.item);
  syncForm();
  saveDraft();
  $("saved").hidden = true;
  (d.controle === "QUANTIDADE"
    ? $("quantity")
    : d.tipo === "SEM_IDENTIFICACAO"
    ? $("item")
    : $("code")
  ).focus();
}

function saveDraft() {
  if (!user || busy) return;
  const ok = storage("draft", {
    dados: formData(),
    editing: null,
    repeat: $("repeat").checked,
    baixaDireta: $("directDown").checked,
    motivo: $("directReason").value,
  });
  setHelpHint(
    $("draftInfo"),
    ok ? "Rascunho salvo" : "Não foi possível guardar o rascunho neste navegador.",
    "draft",
  );
}

function restoreDraft() {
  const d = storage("draft");
  if (!d?.dados) return;
  if (d.editing) {
    toast(
      "Há um rascunho de edição da versão anterior. Abra o item na consulta para revisá-lo.",
    );
    return;
  }
  const r = d.dados;
  $("item").value = r.item || "";
  $("note").value = r.observacao || "";
  $("code").value = r.codigo || "";
  setChoice("room", ROOMS.includes(r.ambiente) ? r.ambiente : ROOMS[0]);
  setChoice("category", r.categoria);
  setChoice("type", r.tipo);
  setChoice("shelf", r.estante);
  setChoice("level", r.prateleira);
  learnedKey = key(r.item);
  setChoice("control", r.controle || "INDIVIDUAL");
  $("quantity").value = r.quantidade || "1";
  $("unit").value = r.unidade || "unidade";
  $("minimum").value = r.minimo || "0";
  $("directDown").checked = false;
  $("directReason").value = d.motivo || "";
  syncDirectDown();
  manual = {
    categoria: true,
    tipo: true,
    controle: true
  };
  $("repeat").checked = false;
  syncForm();
}

function resetForm() {
  const keep = false;
  $("code").value = "";
  $("note").value = "";
  $("quantity").value = "1";
  $("directDown").checked = false;
  $("directReason").value = "";
  syncDirectDown();
  if (!keep) {
    $("item").value = "";
    setChoice("category", "");
    setChoice("type", "");
    manual = {
      categoria: false,
      tipo: false,
      controle: false
    };
    setChoice("control", "INDIVIDUAL");
    $("minimum").value = "0";
    $("unit").value = "unidade";
    learnedKey = "";
    setHelpHint($("learningHint"), "Sugestões conforme você digita.", "suggestion");
    $("learningHint").dataset.help =
      "Escolha um nome existente ou cadastre um novo. As sugestões se baseiam no histórico do inventário.";
  }
  $("suggestions").hidden = true;
  $("item").setAttribute("aria-expanded", "false");
  syncForm();
}

function duplicateHint() {
  const e = scanTarget === "editCode",
    code = $(e ? "editCode" : "code").value,
    t = value(e ? "editType" : "type"),
    r = rows.find(
      (r) =>
      r.dados.tipo === t &&
      r.dados.codigo === code &&
      r.id !== (e ? editor?.id : null),
    );
  setHelpHint(
    $(e ? "editCodeHint" : "codeHint"),
    r && code
    ? "Já cadastrado: " + r.dados.item + " · " + STATUS[r.situacao]
    : "Sobre o código",
    r && code ? "warning" : t === "SEM_IDENTIFICACAO" ? "sequence" : "code",
  );
}

async function refresh(visual = false) {
  if (!user || mustChangePassword(user)) return;
  if (refreshTask) {
    if (!visual) return refreshTask;
    const owner = user.id,
      token = setAcervoSync(true, "Vamos ver o que mudou por aqui.");
    try {
      return await refreshTask;
    }
    finally {
      if (!user || user.id === owner) setAcervoSync(false, undefined, false, token);
    }
  }
  const owner = user?.id;
  const visualToken = visual ? setAcervoSync(true, lastSuccess ? "Vamos ver o que mudou por aqui." : "Só um instante. Estamos colocando tudo no lugar.", !lastSuccess) : null;
  refreshTask = (async() => {
    try {
      const data = await rpc("acervo_ler_v3");
      if (!user || user.id !== owner) return;
      rows = data.itens || [];
      checks = data.conferencias || [];
      role = data.perfil || "leitor";
      $("accountRole").textContent = PEOPLE_ROLES[role] || "Leitor";
      $("manageAccess").hidden = role !== "admin";
      if (role !== "admin" && $("userAccessDialog").open) {
        $("userAccessDialog").close(); resetPeopleManagement();
      }
      renderMovementResults();
      lastSuccess = new Date();
      $("live").className = "live";
      $("live").textContent =
        "Atualizado " +
        new Intl.DateTimeFormat("pt-BR", {
          timeZone: ZONE,
          timeStyle: "short",
        }).format(lastSuccess);
      const snapshot = JSON.stringify([rows, checks, role]);
      if (snapshot !== lastSnapshot) {
        lastSnapshot = snapshot;
        renderFilters();
        renderMetrics();
        renderMovementTimeline();
        if (editor) {
          $("listNotice").hidden = false;
          if (role === "leitor") $("editFields").disabled = true;
        } else renderList();
      }
      updateRoomCounts();
      if (type() === "SEM_IDENTIFICACAO") syncCode();
      updateRegistrationSummary();
      $("fields").disabled = busy || !!pending || role === "leitor";
    } catch (e) {
      if (e.code === "42501") {
        endSession();
        $("loginMessage").textContent =
          "Sua conta não tem mais permissão de acesso. Consulte o administrador.";
        throw e;
      }
      $("live").className = "live stale";
      $("live").textContent = lastSuccess
        ? "Sem atualização · tentando reconectar"
        : "Não foi possível atualizar";
      throw e;
    }
  })().finally(() => {
    refreshTask = null;
    if (visual && (!user || user.id === owner)) setAcervoSync(false, undefined, false, visualToken);
  });
  return refreshTask;
}

function updateRoomCounts() {
  for (const input of document.querySelectorAll("[name=room]")) {
    const span = input.nextElementSibling;
    let count = span.querySelector("b");
    if (!count) {
      count = el("b");
      span.append(count);
    }
    count.textContent = rows.filter(
      (r) => r.situacao === "ATIVO" && r.dados.ambiente === input.value,
    ).length;
  }
}

function startPolling() {
  clearInterval(pollTimer);
  pollTimer = setInterval(() => {
    if (user && !document.hidden && !busy) refresh().catch(() => {});
  }, 5000);
}

function filtered() {
  const q = key($("search").value);
  return rows
    .filter((r) => {
      const d = r.dados;
      return(
        (!q ||
          key(
            [
              d.item,
              d.codigo,
              internal(r.id),
              d.observacao,
              r.legado?.numero_serie,
            ].join(" "),
          ).includes(q)) &&
        (!filters.ambiente || d.ambiente === filters.ambiente) &&
        (!filters.controle ||
          (r.controle || "INDIVIDUAL") === filters.controle) &&
        (!filters.categoria || d.categoria === filters.categoria) &&
        (!filters.tipo || d.tipo === filters.tipo) &&
        (filters.situacao === "TODOS" ||
          (!filters.situacao ? r.situacao !== "ARQUIVADO" :
            filters.situacao === "EM_USO"
            ? ["ATIVO", "EMPRESTADO"].includes(r.situacao)
            : r.situacao === filters.situacao)) &&
        (!filters.estante || d.estante === filters.estante) &&
        (!filters.prateleira ||
          String(d.prateleira) === filters.prateleira) &&
        (!filters.dia || dayKey(r.criado_em) === filters.dia) &&
        (!filters.item || key(d.item) === key(filters.item))
      );
    })
    .sort(
      (a, b) =>
      new Date(b.criado_em) - new Date(a.criado_em) || b.id - a.id,
    );
}

function leaveEditor() {
  return editor ? closeEdit() : true;
}

function changeFilter(field, v) {
  if (!leaveEditor()) return;
  filters[field] = v;
  if (field === "ambiente" && v !== "Almoxarifado") {
    filters.estante = "";
    filters.prateleira = "";
  }
  page = 1;
  expanded = null;
  renderFilters();
  renderList();
}

function filterButtons(target, field, opts) {
  $(target).replaceChildren(
    ...[["", field === "situacao" ? "Lista corrente" : "Todos"], ...opts].map(([v, t]) => {
      const b = button(
        t,
        () => changeFilter(field, v),
        "chip" + (filters[field] === v ? " active" : ""),
      );
      b.setAttribute("aria-pressed", String(filters[field] === v));
      return b;
    }),
  );
}

function renderFilters() {
  filterButtons(
    "quickRooms",
    "ambiente",
    ROOMS.map((v) => [v, v]),
  );
  filterButtons(
    "filterCategory",
    "categoria",
    CATEGORIES.map((v) => [v, v]),
  );
  filterButtons("filterType", "tipo", Object.entries(TYPE));
  filterButtons("filterStatus", "situacao", [["TODOS", "Todos os registros"], ...Object.entries(STATUS)
    .filter(([state]) => state !== "ARQUIVADO" || rows.some(r => r.situacao === "ARQUIVADO"))]);
  const discarded = rows.filter(r => r.situacao === "BAIXADO").length;
  labelButton($("viewDiscarded"), "Descartados (" + discarded + ")", "writeoff");
  $("viewDiscarded").setAttribute("aria-pressed", String(filters.situacao === "BAIXADO"));
  filterButtons(
    "filterShelf",
    "estante",
    [..."ABCDE"].map((v) => [v, v]),
  );
  filterButtons(
    "filterLevel",
    "prateleira",
    [1, 2, 3, 4, 5, 6].map((v) => [
      String(v),
      String(v).padStart(2, "0"),
    ]),
  );
  $("warehouseFilters").hidden = filters.ambiente !== "Almoxarifado";
  const names = {
    controle: "Controle",
    ambiente: "Ambiente",
    categoria: "Categoria",
    tipo: "Identificação",
    situacao: "Situação",
    estante: "Estante",
    prateleira: "Prateleira",
    dia: "Cadastro",
    item: "Item",
  };
  $("applied").replaceChildren(
    ...Object.entries(filters)
    .filter(([, v]) => v)
    .map(([f, v]) =>
      button(
        names[f] +
        ": " +
        (TYPE[v] ||
          (v === "EM_USO" ? "Ativos e emprestados" : STATUS[v]) ||
          (v === "QUANTIDADE" ? "Por quantidade" : v)),
        () => changeFilter(f, ""),
        "chip",
        "close",
      ),
    ),
  );
}

function query(preset) {
  if (!leaveEditor()) return;
  Object.keys(filters).forEach((k) => (filters[k] = preset[k] || ""));
  $("search").value = "";
  page = 1;
  expanded = null;
  renderFilters();
  renderList();
  showTab("browse");
}

function renderList() {
  if (editor) return;
  const found = filtered(),
    pages = Math.max(1, Math.ceil(found.length / 25));
  page = Math.min(page, pages);
  $("resultCount").textContent = found.length + " registros encontrados";
  $("pageLabel").textContent = page + " / " + pages;
  $("previous").disabled = busy || page === 1;
  $("next").disabled = busy || page === pages;
  $("results").replaceChildren();
  for (const r of found.slice((page - 1) * 25, page * 25)) {
    const tr = el("tr", undefined, "record-row");
    tr.dataset.id = r.id;
    const d = r.dados;
    tr.append(
      el("td", d.item),
      el("td", d.codigo ? TYPE[d.tipo] + " " + d.codigo : internal(r.id)),
      el(
        "td",
        d.ambiente + (locationText(r) ? " · " + locationText(r) : ""),
      ),
    );
    if (r.controle === "QUANTIDADE")
    tr.firstChild.append(
      el("div", r.situacao === "BAIXADO"
        ? r.baixa?.quantidade != null ? "Descarte: " + quantityText(r.baixa.quantidade, r.unidade) : "Estoque descartado"
        : `${r.saldo} ${r.unidade} · em estoque`, "hint"),
    );
    if (r.emprestimo)
    tr.firstChild.append(
      el(
        "div",
        `${r.emprestimo.responsavel} · ${r.emprestimo.destino}`,
        "hint",
      ),
    );
    const status = el("td");
    status.append(
      el(
        "span",
        STATUS[r.situacao],
        "badge" +
        (r.situacao === "BAIXADO"
          ? " down"
          : r.situacao === "ARQUIVADO"
          ? " archive"
          : ""),
      ),
    );
    tr.append(
      status,
      el("td", d.observacao || "—", "note"),
      el("td", dateBR(r.criado_em), "date"),
    );
    const actionCell = el("td");
    const open = button(
      expanded === r.id ? "Fechar" : "Abrir",
      () => {
        if (!leaveEditor()) return;
        expanded = expanded === r.id ? null : r.id;
        renderList();
      },
      "",
      expanded === r.id ? "close" : "right",
    );
    open.setAttribute("aria-expanded", String(expanded === r.id));
    actionCell.append(open);
    tr.append(actionCell);
    $("results").append(tr);
    [
      "Item",
      "Identificação",
      "Ambiente",
      "Situação",
      "Observação",
      "Cadastrado em",
      "Detalhes",
    ].forEach((label, i) => (tr.children[i].dataset.label = label));
    if (expanded === r.id) {
      const row = el("tr", undefined, "detail-row"),
        cell = el("td"),
        panel = el("div", undefined, "detail-panel");
      cell.colSpan = 7;
      panel.id = "detailPanel";
      cell.append(panel);
      row.append(cell);
      $("results").append(row);
      renderDetails(r, panel);
    }
  }
  if (!found.length) {
    const tr = el("tr"),
      td = el("td", undefined, "empty");
    td.append(acervoEmpty("Ainda não encontramos por aqui.", "Vamos tentar outro nome ou ajustar os filtros?"));
    td.colSpan = 7;
    tr.append(td);
    $("results").append(tr);
  }
}

function renderDetails(r, panel) {
  panel.replaceChildren();
  panel.append(el("h3", r.dados.item + " · " + internal(r.id)));
  const dl = el("dl");
  for (const [label, text] of[
    ["Categoria", r.dados.categoria],
    [
      "Identificação",
      TYPE[r.dados.tipo] + (r.dados.codigo ? " · " + r.dados.codigo : ""),
    ],
    ["Localização", r.dados.ambiente + " " + locationText(r)],
    ["Cadastro", dateBR(r.criado_em)],
    ["Observação", r.dados.observacao || "—"],
    [
      "Controle",
      r.controle === "QUANTIDADE"
      ? `Por quantidade · ${r.saldo} ${r.unidade} · mínimo ${r.minimo}`
      : "Individual",
    ],
  ])
  dl.append(el("dt", label), el("dd", text));
  panel.append(dl);
  if (r.emprestimo)
  panel.append(
    el(
      "p",
      `Emprestado para ${r.emprestimo.responsavel} · ${r.emprestimo.destino} · ${dateBR(r.emprestimo.momento)}`,
      "notice",
    ),
  );
  if (r.situacao === "BAIXADO") {
    const disposal = el("aside", undefined, "discard-summary");
    const title = el("strong");
    title.append(icon("writeoff"), document.createTextNode("Descarte registrado"));
    disposal.append(title, el("p", "Este item continua no acervo para consulta. Não conta como bem disponível ou estoque ativo.", "hint"));
    const facts = el("dl"),
      baixa = r.baixa || {};
    const disposalDate = /^\d{4}-\d{2}-\d{2}$/.test(baixa.data || "")
      ? baixa.data.split("-").reverse().join("/") : baixa.data || "Não informada";
    for (const [label, text] of[["Data do descarte", disposalDate], ["Motivo", baixa.motivo || "Não informado"],
      ["Registrado por", baixa.email], ["Documento / processo", baixa.documento],
      ["Quantidade descartada", r.controle === "QUANTIDADE" && baixa.quantidade != null ? quantityText(baixa.quantidade, r.unidade) : ""]]) {
        if (text) facts.append(el("dt", label), el("dd", text));
      }
    disposal.append(facts);
    panel.append(disposal);
  }
  if (r.legado) {
    const box = el("details");
    box.append(
      el("summary", "Informações preservadas da versão anterior"),
      el("pre", JSON.stringify(r.legado, null, 2)),
    );
    panel.append(box);
  }
  const actions = el("div", undefined, "actions");
  if (role !== "leitor") {
    for (const a of movementActions(r)) {
      if (a !== "baixar")
      actions.append(
        button(
          ACTION[a],
          () => openOperation(a, r),
          "",
          ACTION_ICON[a],
        ),
      );
    }
    if (r.situacao === "EMPRESTADO")
    actions.append(
      button(
        "Registrar descarte",
        () => openOperation("baixar", r),
        "danger",
        ACTION_ICON.baixar,
      ),
    );
  }
  if (role !== "leitor" && r.situacao === "ATIVO")
  actions.append(
    button("Editar", () => startEdit(r), "", "edit"),
    button(
      "Registrar descarte",
      () => openOperation("baixar", r),
      "danger",
      ACTION_ICON.baixar,
    ),
  );
  if (role === "admin" && ["BAIXADO", "ARQUIVADO"].includes(r.situacao)) {
    const a = r.situacao === "BAIXADO" ? "estornar" : "restaurar";
    actions.append(button(ACTION[a], () => openOperation(a, r), "", ACTION_ICON[a]));
    if (a === "restaurar") panel.append(el("p", "Registro arquivado em uma versão anterior. Seus dados e histórico foram preservados. Restaurar devolve o registro à consulta corrente.", "hint"));
  }
  panel.append(actions);
  const history = el("div", undefined, "history");
  history.append(el("h3", "Histórico"));
  const content = el("div");
  content.append(acervoLoader("Puxando a ficha desta história…", true));
  history.append(content);
  panel.append(history);
  loadHistory(r.id, content);
}

function historyAction(h) {
  const action = String(h.acao || "").toLowerCase();
  const names = {
    cadastrar: "Registro",
    criar: "Registro",
    registro: "Registro",
    editar: "Edição",
    edicao: "Edição",
    baixar: "Descarte",
    baixa: "Descarte",
    estornar: "Descarte revertido",
    arquivar: "Arquivamento",
    restaurar: "Restauração",
    conferir: "Conferência",
    emprestar: "Empréstimo",
    devolver: "Devolução",
    entrada: "Entrada de estoque",
    saida: "Saída de estoque",
    descarte_estoque: "Descarte de estoque",
    cadastrar_baixado: "Cadastro de item descartado",
  };
  if (action === "salvar") return h.antes === null && h.depois ? "Registro" : "Edição";
  return(
    names[action] ||
    (action
      ? action.charAt(0).toUpperCase() + action.slice(1)
      : "Atualização")
  );
}

function historyFacts(h) {
  const object = (v) => v && typeof v === "object" && !Array.isArray(v) ? v : {};
  const before = object(h.antes),
    after = object(h.depois);
  const movement = object(after.movimento);
  const a = String(h.acao || "").toLowerCase();
  const registration = ["cadastrar", "criar", "registro", "cadastrar_baixado"].includes(a) ||
    (a === "salvar" && h.antes === null);
  const facts = [];
  const add = (label, v) => {
    if (v !== undefined && v !== null && String(v).trim()) facts.push([label, String(v)]);
  };
  const number = (v) => v !== null && v !== undefined && v !== "" &&
    Number.isFinite(Number(v)) ? Number(v) : null;
  const format = (v) => Number(v).toLocaleString("pt-BR", {
    maximumFractionDigits: 3
  });
  const stock = (after.controle || before.controle) === "QUANTIDADE";
  const unit = after.unidade || before.unidade || "";
  const amount = (v) => unit ? `${format(v)} ${unit === "unidade" && Number(v) !== 1 ? "unidades" : unit}` : format(v);
  const initial = number(before.saldo),
    final = number(after.saldo);
  if (["entrada", "saida", "descarte_estoque"].includes(a)) {
    const delta = initial !== null && final !== null ? final - initial : null;
    const recorded = number(movement.quantidade);
    const derived = delta !== null && (a === "entrada" ? delta > 0 : delta < 0)
      ? Math.abs(delta) : null;
    const quantity = recorded !== null && recorded > 0 ? recorded : derived;
    if (quantity !== null) add("Quantidade", amount(quantity));
  }
  if (stock && initial !== null && final !== null && initial !== final)
  add("Saldo", `${format(initial)} → ${amount(final)}`);
  else if (stock && registration && !Object.keys(before).length && final !== null)
  add("Saldo inicial", amount(final));
  const loan = a === "devolver" ? object(before.emprestimo) : object(after.emprestimo);
  if (["emprestar", "devolver", "saida"].includes(a)) {
    add(a === "saida" ? "Solicitante" : "Responsável", movement.responsavel || loan.responsavel);
    add("Destino", movement.destino || loan.destino);
  }
  if (before.situacao && after.situacao && before.situacao !== after.situacao)
  add("Situação", `${STATUS[before.situacao] || before.situacao} → ${STATUS[after.situacao] || after.situacao}`);
  const bd = object(before.dados),
    ad = object(after.dados);
  if (["salvar", "editar", "edicao"].includes(a) && Object.keys(before).length) {
    for (const [field, label] of[["item", "Item"], ["categoria", "Categoria"],
      ["ambiente", "Ambiente"], ["tipo", "Identificação"], ["codigo", "Código da etiqueta"],
      ["estante", "Estante"], ["prateleira", "Prateleira"],
      ["observacao", "Observação"], ["ramal", "Ramal"]]) {
        if (field in bd && field in ad && String(bd[field] ?? "") !== String(ad[field] ?? "")) {
          const display = (v) => field === "tipo" ? TYPE[v] || v : v;
          add(label, `${display(bd[field]) || "Não informado"} → ${display(ad[field]) || "Não informado"}`);
        }
      }
    const oldMin = number(before.minimo),
      newMin = number(after.minimo);
    if (stock && oldMin !== null && newMin !== null && oldMin !== newMin)
    add("Estoque mínimo", `${format(oldMin)} → ${amount(newMin)}`);
  }
  if (registration) {
    add("Identificação", ad.tipo === "SEM_IDENTIFICACAO"
      ? after.id ? internal(after.id) : "Código interno" : [TYPE[ad.tipo], ad.codigo].filter(Boolean).join(" · "));
    add("Ambiente", ad.ambiente);
    if (ad.estante && ad.prateleira) add("Posição", `${ad.estante} · ${String(ad.prateleira).padStart(2, "0")}`);
  }
  add("Motivo / observação", h.motivo);
  if (["baixar", "baixa", "cadastrar_baixado"].includes(a))
  add("Documento", object(after.baixa).documento);
  return facts;
}

function appendHistoryDetails(target, h) {
  const facts = historyFacts(h);
  if (!facts.length) return;
  const list = el("dl", undefined, "history-details");
  for (const [label, detail] of facts) {
    const line = el("div");
    line.append(el("dt", label), el("dd", detail));
    list.append(line);
  }
  target.append(list);
}

async function loadHistory(id, target) {
  try {
    const data = await rpc("acervo_historico", {
      p_id: id
    });
    if (!target.isConnected) return;
    target.replaceChildren(
      ...data.map((h) => {
        const n = el("div", undefined, "history-entry");
        n.append(
          el("strong", historyAction(h)),
          el("span", dateBR(h.momento)),
          el(
            "span",
            shortEmail(h.email) || "Não informado",
            "history-user",
          ),
        );
        appendHistoryDetails(n, h);
        return n;
      }),
    );
    if (!data.length)
    target.textContent = "Nenhuma alteração registrada nesta versão.";
  } catch (e) {
    if (target.isConnected) target.textContent = e.message;
  }
}

let editBaseline = "";

function finishEdit() {
  editor = null;
  if ($("editDialog").open) $("editDialog").close();
  $("editDialogContent").replaceChildren();
  $("listNotice").hidden = true;
  editBaseline = "";
}

function closeEdit() {
  if (busy || pending) {
    toast("Conclua a operação pendente antes de fechar a edição.", true);
    return false;
  }
  if (editor && JSON.stringify(formData("edit")) !== editBaseline &&
    !confirm("Descartar as alterações não salvas?")) return false;
  const id = editor?.id;
  finishEdit();
  renderList();
  document.querySelector('.record-row[data-id="' + id + '"] button')?.focus();
  return true;
}

$("editDialogClose").onclick = closeEdit;
$("editDialog").addEventListener("cancel", event => {
  event.preventDefault(); closeEdit();
});

function startEdit(r) {
  if (busy || pending)
  return toast("Conclua a operação pendente primeiro.", true);
  editor = {
    id: r.id,
    versao: r.versao
  };
  $("editDialogTitle").textContent = "Editar " + internal(r.id);
  const panel = $("editDialogContent");
  panel.replaceChildren();
  const template = $("editorTemplate").content.cloneNode(true);
  panel.append(template);
  const d = r.dados;
  $("editItem").value = d.item;
  organizeEditor(r);
  mountControlFields($("editControlHost"), "edit", r);
  if (r.controle === "QUANTIDADE") $("editStockFields").after($("editCodeWrap"));
  $("editCode").value = d.codigo || "";
  $("editNote").value = d.observacao || "";
  choices(
    $("editCategories"),
    "editCategory",
    CATEGORIES.map((v) => [v, v, CATEGORY_ICON[v]]),
    d.categoria,
  );
  choices(
    $("editTypes"),
    "editType",
    Object.entries(TYPE).map(([v, t]) => [v, t, TYPE_ICON[v]]),
    d.tipo,
    () => {
      $("editCode").value = "";
      syncCode("edit");
    },
  );
  choices(
    $("editRooms"),
    "editRoom",
    ROOMS.map((v) => [v, v, ROOM_ICON[v]]),
    d.ambiente,
    () => syncLocation("edit"),
  );
  choices($("editShelves"), "editShelf", [..."ABCDE"], d.estante);
  choices(
    $("editLevels"),
    "editLevel",
    [1, 2, 3, 4, 5, 6].map((v) => [
      String(v),
      String(v).padStart(2, "0"),
    ]),
    String(d.prateleira || ""),
  );
  document
    .querySelectorAll("[name=editShelf],[name=editLevel]")
    .forEach((n) => (n.onchange = () => syncLocation("edit")));
  syncCode("edit");
  syncLocation("edit");
  $("editCancel").onclick = closeEdit;
  $("editScan").onclick = () => openScanner("editCode");
  $("editCode").oninput = () => {
    $("editCode").value = $("editCode")
      .value.replace(/\D/g, "")
      .slice(0, 6);
  };
  $("editForm").onsubmit = (e) => {
    e.preventDefault();
    if (busy || role === "leitor" || !$("editForm").reportValidity())
    return;
    saveRecord("edit");
  };
  syncFieldIdentity();
  editBaseline = JSON.stringify(formData("edit"));
  $("editDialog").showModal();
  $(innerWidth <= 640 ? "editDialogClose" : "editItem").focus();
  $("editDialog").scrollTop = 0;
}

function validateRecord(d, id = null) {
  const reject = message => {
    toast(message, true);
    return false;
  };
  const duplicate = rows.find(
    (r) =>
    d.codigo &&
    r.dados.tipo === d.tipo &&
    r.dados.codigo === d.codigo &&
    r.id !== id,
  );
  if (duplicate)
  return reject("Código já cadastrado: " + internal(duplicate.id), true);
  if (d.controle === "QUANTIDADE" && d.ambiente !== "Almoxarifado")
  return reject(
    "Por quantidade: selecione Almoxarifado ou troque o controle para Individual.",
    true,
  );
  if (d.controle === "QUANTIDADE" && d.tipo !== "SEM_IDENTIFICACAO")
  return reject(
    "Um estoque agrupado usa identificação interna. Selecione Sem identificação ou controle Individual.",
    true,
  );
  return true;
}

function saveRecord(prefix = "", discard = false) {
  if (busy || role === "leitor" || pending) return false;
  const d = formData(prefix),
    id = prefix === "edit" ? editor?.id : null;
  if (!validateRecord(d, id)) return false;
  const observation = $("directReason").value.trim();
  const discardReason = observation
    ? observation.length >= 3 ? observation : "Observação: " + observation
    : "Descarte registrado no cadastro.";
  commit(
    {
      acao: "salvar",
      id,
      versao: prefix === "edit" ? editor.versao : null,
      dados: d,
      baixa_direta: !id && discard,
      motivo: !id && discard
      ? discardReason
      : "",
    },
    prefix === "edit" ? "edit" : "create",
  );
  return true;
}

function openOperation(a, r) {
  if (busy || pending)
  return toast("Conclua a operação pendente primeiro.", true);
  selected = r;
  action = a;
  $("operation").classList.toggle("destructive", ["baixar", "descarte_estoque"].includes(a));
  $("operationTitle").textContent = ACTION[a] + " · " + internal(r.id);
  $("operationHint").textContent =
    a === "baixar"
    ? "Controle interno do acervo. Não executa a baixa patrimonial oficial."
    : "A justificativa ficará registrada no histórico.";
  $("downFields").hidden = a !== "baixar";
  $("downDate").required = a === "baixar";
  $("downDate").value = today();
  $("downDate").max = today();
  $("reason").value = "";
  $("document").value = "";
  configureMovement(a, r);
  $("operation").showModal();
}

async function commit(body, origin = "operation") {
  if (busy || role === "leitor") return;
  if (pending)
  return toast(
    "Use Verificar e concluir antes de outra operação.",
    true,
  );
  pending = {
    chave: crypto.randomUUID(),
    body,
    origin
  };
  if (!storage("pending", pending)) {
    pending = null;
    return toast(
      "Habilite o armazenamento do navegador antes de salvar.",
      true,
    );
  }
  await transmit();
}

async function transmit() {
  if (busy || !pending) return;
  setBusy(true);
  const op = pending;
  const owner = user?.id;
  try {
    if (refreshTask) await refreshTask.catch(() => {});
    const result = await rpc("acervo_gravar_v3", {
      p_chave: op.chave,
      p: op.body,
    });
    if (!user || user.id !== owner) return;
    pending = null;
    storage("pending", null);
    if (
      op.body.acao === "salvar" &&
      (op.origin === "create" || !op.body.id)
    ) {
      const template = {
        ...op.body.dados
      };
      resetForm();
      showAcervoReceipt(result, template);
      storage("draft", {
        dados: formData(),
        editing: null,
        repeat: $("repeat").checked,
      });
    }
    if (op.origin === "edit" || op.body.id) {
      finishEdit();
      if (op.body.id) expanded = op.body.id;
      $("listNotice").hidden = true;
    }
    if ($("operation").open) $("operation").close();
    $("save").classList.remove("saved-flash");
    requestAnimationFrame(() => $("save").classList.add("saved-flash"));
    setTimeout(() => $("save").classList.remove("saved-flash"), 700);
    toast(op.origin === "create" && result.situacao !== "BAIXADO" ? "Pronto. Mais um bem no seu lugar." : "Operação salva.");
    try {
      await refresh();
    } catch {
      toast(
        "Salvo no banco. A lista será atualizada quando a conexão voltar.",
        true,
      );
    }
    if (op.origin === "create") $("item").focus();
  } catch (e) {
    if (e.code) {
      pending = null;
      storage("pending", null);
    }
    toast(
      e.message || "Sem confirmação. Use Verificar e concluir.",
      true,
    );
  } finally {
    setBusy(false);
    if (!editor) renderList();
  }
}

function chart(target, groups, total, fn) {
  $(target).replaceChildren(
    ...groups.map(([label, n, k]) => {
      const b = button("", () => fn(k ?? label), "chartline");
      const track = el("div", undefined, "track"),
      fill = el("div", undefined, "fill");
      fill.style.width = (total ? (n / total) * 100 : 0) + "%";
      track.append(fill);
      b.append(el("span", label), track, el("b", n));
      b.title =
      label +
      ": " +
      n +
      (total ? " (" + Math.round((n / total) * 100) + "%)" : "");
      return b;
    }),
  );
}

let timelineGeneration = 0;
const timelineCache = new Map();
async function renderMovementTimeline() {
  const generation = ++timelineGeneration;
  const owner = user?.id;
  const candidates = [...rows]
    .sort(
      (a, b) =>
      new Date(b.atualizado_em || b.criado_em) -
      new Date(a.atualizado_em || a.criado_em),
    )
    .slice(0, 12);
  $("toggleMovementTimeline").hidden = true;
  $("movementTimeline").replaceChildren(acervoLoader("Cada movimento tem uma história. Vamos buscar a sua.", true));
  try {
    const histories = await Promise.all(
      candidates.map(async(r) => {
        const cacheKey = `${owner}:${r.id}:${r.versao}`;
        let history = timelineCache.get(cacheKey);
        if (!history) {
          history = await rpc("acervo_historico", {
            p_id: r.id
          });
          timelineCache.set(cacheKey, history);
        }
        return history.map((h) => ({
          ...h,
          itemName: r.dados.item,
          itemId: r.id,
        }));
      }),
    );
    if (generation !== timelineGeneration || user?.id !== owner) return;
    const events = histories
      .flat()
      .sort(
        (a, b) =>
        new Date(b.momento) - new Date(a.momento) || b.id - a.id,
      )
      .slice(0, 12);
    $("movementTimeline").replaceChildren(
      ...events.map((h) => {
        const row = el("div", undefined, "recent-row");
        const event = el("div");
        event.append(el("span", historyAction(h)));
        const facts = historyFacts(h);
        if (facts.length) event.append(el("small", facts.slice(0, 2)
          .map(([label, detail]) => `${label}: ${detail}`).join(" · "), "movement-event-detail"));
        row.append(
          el("strong", h.itemName),
          event,
          el("small", `${shortEmail(h.email)} · ${dateBR(h.momento)}`),
          button(
            "Consultar",
            () => {
              query({});
              $("search").value = internal(h.itemId);
              renderList();
            },
            "",
            "right",
          ),
        );
        return row;
      }),
    );
    syncDashboardList("movementTimeline", "toggleMovementTimeline", 4, "movimentações");
    if (!events.length)
    $("movementTimeline").textContent =
      "Cada movimento tem uma história. A primeira vai aparecer aqui.";
  } catch {
    if (generation === timelineGeneration)
    $("movementTimeline").replaceChildren(
      el("p", "Não foi possível carregar as movimentações."),
      button("Tentar novamente", renderMovementTimeline),
    );
  }
}

function syncDashboardList(id, controlId, limit, noun) {
  const list = $(id),
    control = $(controlId);
  const remaining = Math.max(0, list.children.length - limit);
  const expanded = list.classList.contains("expanded");
  control.hidden = remaining === 0;
  control.setAttribute("aria-expanded", String(expanded));
  const label = remaining === 1 ? ({
    materiais: "material",
    movimentações: "movimentação",
    empréstimos: "empréstimo"
  }
    [noun] || noun) : noun;
  labelButton(control, expanded ? "Mostrar menos" : "Ver mais " + remaining + " " + label, "right");
}

for (const [id, controlId, limit, noun] of[
  ["stockAlerts", "toggleStockAlerts", 3, "materiais"],
  ["movementTimeline", "toggleMovementTimeline", 4, "movimentações"],
  ["loanWatch", "toggleLoanWatch", 3, "empréstimos"],
]) $(controlId).onclick = () => {
  $(id).classList.toggle("expanded");
  syncDashboardList(id, controlId, limit, noun);
};

function openDashboardRecord(r) {
  if (!leaveEditor()) return;
  query({});
  $("search").value = internal(r.id);
  expanded = r.id;
  renderList();
}

function renderExecutiveSummary(active, loans, lowStock) {
  const stocks = active.filter(r => r.controle === "QUANTIDADE");
  const pulse = $("dashboardPulse"),
    copy = el("div");
  pulse.dataset.state = lowStock.length ? "attention" : "neutral";
  const heading = lowStock.length ? "Atenção à reposição" : stocks.length ? "Estoque acima do mínimo" : "Estoque ainda não cadastrado";
  const emptyStocks = lowStock.filter(r => Number(r.saldo) <= 0).length;
  const description = lowStock.length
    ? `${lowStock.length} ${lowStock.length === 1 ? "material está" : "materiais estão"} no mínimo ou abaixo dele${emptyStocks ? `; ${emptyStocks} sem saldo` : ""}.`
    : stocks.length ? "Nenhum material chegou ao mínimo definido no cadastro." : "Cadastre materiais por quantidade no Almoxarifado para acompanhar os saldos.";
  copy.append(el("strong", heading), el("p", description));
  pulse.replaceChildren(icon(lowStock.length ? "stock-alert" : "stock"), copy);
  $("loanWatchCount").textContent = loans.length;
  $("loanWatch").replaceChildren(...(loans.length ? [...loans]
    .sort((a, b) => String(a.emprestimo?.momento || a.atualizado_em || "").localeCompare(String(b.emprestimo?.momento || b.atualizado_em || "")))
    .map(r => {
      const card = el("article", undefined, "loan-watch-card");
      card.append(el("h4", r.dados.item), el("p", r.emprestimo?.responsavel || "Responsável não informado", "loan-holder"));
      if (r.emprestimo?.destino) card.append(el("p", r.emprestimo.destino));
      if (r.emprestimo?.momento) card.append(el("p", "Desde " + dateBR(r.emprestimo.momento), "hint"));
      const actions = el("div", undefined, "attention-actions");
      actions.append(button("Consultar", () => openDashboardRecord(r), "", "right"));
      if (role !== "leitor") actions.append(button("Registrar devolução", () => openOperation("devolver", r), "", "return"));
      card.append(actions); return card;
    }) : [el("p", "Nenhum bem emprestado no momento.", "dashboard-empty")]));
  syncDashboardList("loanWatch", "toggleLoanWatch", 3, "empréstimos");
  $("roomSummary").replaceChildren(...ROOMS.map(room => {
    const roomActive = active.filter(r => r.dados.ambiente === room);
    const goods = roomActive.filter(r => r.controle !== "QUANTIDADE").length;
    const stockCount = roomActive.filter(r => r.controle === "QUANTIDADE").length;
    const low = lowStock.filter(r => r.dados.ambiente === room).length;
    const card = button("", () => query({
      ambiente: room,
      situacao: "ATIVO"
    }), "room-summary");
    const title = el("span", undefined, "room-summary-heading"); title.append(icon(ROOM_ICON[room]), el("span", room));
    const counts = el("span", undefined, "room-summary-count");
    counts.append(el("b", goods), document.createTextNode(goods === 1 ? " bem ativo" : " bens ativos"));
    if (stockCount) counts.append(el("span", `${stockCount} ${stockCount === 1 ? "estoque" : "estoques"}${low ? ` · ${low} para repor` : ""}`));
    const meter = el("span", undefined, "room-summary-meter"),
      fill = el("i");
    const totalGoods = active.filter(r => r.controle !== "QUANTIDADE").length;
    fill.style.width = (totalGoods ? goods / totalGoods * 100 : 0) + "%"; meter.setAttribute("aria-hidden", "true"); meter.append(fill);
    card.append(title, counts, meter, el("span", totalGoods ? Math.round(goods / totalGoods * 100) + "% dos bens ativos" : "Nenhum bem individual ativo", "room-summary-state"));
    card.setAttribute("aria-label", `${room}: ${goods} bens ativos, ${stockCount} estoques ativos. Consultar itens.`);
    return card;
  }));
}

function renderOverviewCharts() {
  const percent = (n, total) => total ? Math.round(n / total * 100) + "%" : "0%";
  const goods = rows.filter(r => r.controle !== "QUANTIDADE" && ["ATIVO", "EMPRESTADO", "BAIXADO"].includes(r.situacao));
  const groups = [
    ["Ativos", "ATIVO", "#1376c5"],
    ["Emprestados", "EMPRESTADO", "#b17b2e"],
    ["Descartados", "BAIXADO", "#bb4561"],
  ].map(([label, state, color]) => ({
    label,
    state,
    color,
    n: goods.filter(r => r.situacao === state).length
  }));
  const visual = el("div", undefined, "status-visual"),
    ring = el("div", undefined, "status-ring"),
    center = el("div", undefined, "status-ring-center"),
    legend = el("div", undefined, "visual-legend");
  let offset = 0;
  const stops = groups.map(g => {
    const start = offset; offset += goods.length ? g.n / goods.length * 360 : 0; return `${g.color} ${start}deg ${offset}deg`;
  });
  if (goods.length) ring.style.background = `conic-gradient(${stops.join(",")})`;
  ring.setAttribute("aria-hidden", "true");
  center.append(el("b", goods.length), el("span", "bens no gráfico"));
  ring.append(center);
  groups.forEach(g => {
    const b = button("", () => query({
      controle: "INDIVIDUAL",
      situacao: g.state
    }));
    b.style.setProperty("--segment", g.color);
    b.append(el("i", undefined, "legend-dot"), el("span", g.label), el("b", g.n), el("small", percent(g.n, goods.length)));
    b.setAttribute("aria-label", `${g.label}: ${g.n} bens individuais, ${percent(g.n,goods.length)}. Consultar.`); legend.append(b);
  });
  visual.append(ring, legend);
  $("goodsStatusChart").replaceChildren(visual, el("p", goods.length ? "Clique na legenda para consultar. Estoques e registros arquivados ficam fora deste gráfico." : "Nenhum bem individual cadastrado para este gráfico.", "visual-footnote"));
  const stocks = rows.filter(r => r.controle === "QUANTIDADE" && r.situacao === "ATIVO");
  const health = [
    {
      label: "Acima do mínimo",
      color: "#1376c5",
      n: stocks.filter(r => Number(r.saldo) > 0 && Number(r.saldo) > Number(r.minimo)).length
    },
    {
      label: "No mínimo ou abaixo",
      color: "#b17b2e",
      n: stocks.filter(r => Number(r.saldo) > 0 && Number(r.saldo) <= Number(r.minimo)).length
    },
    {
      label: "Sem saldo",
      color: "#bb4561",
      n: stocks.filter(r => Number(r.saldo) <= 0).length
    },
  ];
  const heading = el("div", undefined, "stock-health-total"),
    track = el("div", undefined, "stock-health-track"),
    list = el("div");
  heading.append(el("b", stocks.length), el("span", stocks.length === 1 ? "material acompanhado" : "materiais acompanhados"));
  track.setAttribute("aria-hidden", "true");
  health.forEach(g => {
    if (g.n) {
      const segment = el("span"); segment.style.width = (g.n / stocks.length * 100) + "%"; segment.style.setProperty("--segment", g.color); track.append(segment);
    }
    const line = el("div", undefined, "stock-health-row"); line.style.setProperty("--segment", g.color);
    line.append(el("i", undefined, "legend-dot"), el("span", g.label), el("b", g.n), el("small", percent(g.n, stocks.length))); list.append(line);
  });
  $("stockHealthChart").replaceChildren(heading, track, list, el("p", stocks.length ? "Contagem de materiais cadastrados, sem somar unidades diferentes." : "Cadastre materiais por quantidade para acompanhar os estoques.", "visual-footnote"));
}

function renderMetrics() {
  const individual = rows.filter(
    (r) =>
    r.controle !== "QUANTIDADE" &&
    ["ATIVO", "EMPRESTADO"].includes(r.situacao),
  );
  const available = individual.filter(
    (r) => r.situacao === "ATIVO",
  ).length;
  const borrowed = individual.length - available;
  const track = el("div", undefined, "availability-track");
  for (const [label, n, state] of[
    ["Disponíveis", available, "ATIVO"],
    ["Emprestados", borrowed, "EMPRESTADO"],
  ]) {
    if (!n) continue;
    const b = button("", () =>
      query({
        controle: "INDIVIDUAL",
        situacao: state
      }),
    );
    b.style.width = (n / individual.length) * 100 + "%";
    b.setAttribute("aria-label", `${label}: ${n}`);
    b.title = `${label}: ${n}`;
    track.append(b);
  }
  $("availability").replaceChildren(
    el("strong", `${individual.length} bens individuais ativos ou emprestados`),
    track,
    button(
      `${available} disponíveis`,
      () => query({
        controle: "INDIVIDUAL",
        situacao: "ATIVO"
      }),
      "chip",
    ),
    button(
      `${borrowed} emprestados`,
      () => query({
        controle: "INDIVIDUAL",
        situacao: "EMPRESTADO"
      }),
      "chip",
    ),
  );
  const active = rows.filter((r) => r.situacao === "ATIVO"),
    inUse = rows.filter((r) =>
      ["ATIVO", "EMPRESTADO"].includes(r.situacao),
    ),
    count = (f, v) => inUse.filter((r) => r.dados[f] === v).length;
  const lowStock = active.filter((r) => r.controle === "QUANTIDADE" &&
    Number(r.saldo) <= Number(r.minimo)).sort((a, b) =>
      Number(a.saldo > 0) - Number(b.saldo > 0) ||
      Number(a.saldo) / Math.max(1, Number(a.minimo)) -
      Number(b.saldo) / Math.max(1, Number(b.minimo)) ||
      String(a.dados.item).localeCompare(String(b.dados.item), "pt-BR")
    );
  const metrics = [
    ["Registros ativos", active.length, "available", {
      situacao: "ATIVO"
    }],
    [
      "Emprestados",
      rows.filter((r) => r.situacao === "EMPRESTADO").length,
      "loan",
      {
        situacao: "EMPRESTADO"
      },
    ],
    [
      "Estoques ativos",
      active.filter((r) => r.controle === "QUANTIDADE").length,
      "stock",
      {
        situacao: "ATIVO",
        controle: "QUANTIDADE"
      },
    ],
    [
      "Descartados",
      rows.filter((r) => r.situacao === "BAIXADO").length,
      "writeoff",
      {
        situacao: "BAIXADO"
      },
    ],
    [
      "Sem etiqueta · ativos",
      active.filter((r) => r.dados.tipo === "SEM_IDENTIFICACAO").length,
      "none",
      {
        situacao: "ATIVO",
        tipo: "SEM_IDENTIFICACAO"
      },
    ],
    [
      "Arquivados",
      rows.filter((r) => r.situacao === "ARQUIVADO").length,
      "archive",
      {
        situacao: "ARQUIVADO"
      },
    ],
  ];
  const metricButton = ([title, total, mark, filter]) => {
    const b = button("", () => filter ? query(filter) : $("stockWatch").scrollIntoView({
      block: "start",
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    }), "stat", mark);
    b.dataset.tone = mark;
    b.append(el("b", total), el("span", title));
    return b;
  };
  const loans = rows.filter(r => r.situacao === "EMPRESTADO");
  const stockCount = active.filter(r => r.controle === "QUANTIDADE").length;
  const primary = [
    ["Bens acompanhados", individual.length, "available", {
      controle: "INDIVIDUAL",
      situacao: "EM_USO"
    }, `${available} ${available === 1 ? "ativo" : "ativos"} · ${borrowed} ${borrowed === 1 ? "emprestado" : "emprestados"}`],
    ["Bens emprestados", loans.length, "loan", {
      situacao: "EMPRESTADO"
    }, "Empréstimos ainda em aberto"],
    ["Materiais em estoque", stockCount, "stock", {
      situacao: "ATIVO",
      controle: "QUANTIDADE"
    }, "Cadastros por quantidade"],
    ["Materiais para repor", lowStock.length, "stock-alert", null, "Saldo no mínimo ou abaixo dele"],
  ];
  $("stats").replaceChildren(...primary.map(metric => {
    const b = metricButton(metric); b.append(el("small", metric[4])); return b;
  }));
  renderExecutiveSummary(active, loans, lowStock);
  renderOverviewCharts();
  $("secondaryStats").replaceChildren(...metrics.slice(2).filter(m => m[0] !== "Arquivados" || m[1] > 0).map(metricButton));
  chart(
    "categoryChart",
    CATEGORIES.map((v) => [v, count("categoria", v)]),
    inUse.length,
    (v) => query({
      categoria: v,
      situacao: "EM_USO"
    }),
  );
  chart(
    "typeChart",
    Object.entries(TYPE).map(([v, n]) => [n, count("tipo", v), v]),
    inUse.length,
    (v) => query({
      tipo: v,
      situacao: "EM_USO"
    }),
  );
  const items = new Map();
  inUse.forEach((r) => {
    const k = key(r.dados.item),
      o = items.get(k) || {
        name: r.dados.item,
        n: 0
      };
    o.n++;
    items.set(k, o);
  });
  chart(
    "topChart",
    [...items.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, 6)
    .map((o) => [o.name, o.n]),
    inUse.length,
    (v) => query({
      item: v,
      situacao: "EM_USO"
    }),
  );
  if (!items.size)
  $("topChart").textContent =
    "Os itens aparecerão conforme você cadastrar.";
  $("sideTotal").textContent = active.length;
  const a = active.length
    ? (count("ambiente", ROOMS[0]) / active.length) * 360
    : 0,
    b = active.length
    ? (count("ambiente", ROOMS[1]) / active.length) * 360
    : 0;
  $("sideRing").style.background =
    `conic-gradient(#b6e4ff 0deg ${a}deg,#65a0d0 ${a}deg ${a + b}deg,#526473 ${a + b}deg 360deg)`;
  $("sideRooms").replaceChildren(
    ...ROOMS.map((room) => {
      const n = button(
        room,
        () => query({
          ambiente: room,
          situacao: "ATIVO"
        }),
        "",
        ROOM_ICON[room],
      );
      n.append(el("b", count("ambiente", room)));
      return n;
    }),
  );
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today() + "T12:00:00Z");
    d.setUTCDate(d.getUTCDate() - i);
    const k = dayKey(d);
    days.push([k, rows.filter((r) => dayKey(r.criado_em) === k).length]);
  }
  const max = Math.max(1, ...days.map((d) => d[1]));
  $("activity").replaceChildren(
    ...days.map(([d, n]) => {
      const b = button("", () => query({
        dia: d
      }), "day"),
      bar = el("i");
      bar.style.height = Math.max(3, (n / max) * 125) + "px";
      b.append(
        el("b", n),
        bar,
        el("span", d.slice(8) + "/" + d.slice(5, 7)),
      );
      b.setAttribute("aria-label", n + " registros em " + d);
      return b;
    }),
  );
  $("stockAlertCount").textContent = lowStock.length +
    (lowStock.length === 1 ? " material" : " materiais");
  const numberBR = (n) => Number(n).toLocaleString("pt-BR", {
    maximumFractionDigits: 3
  });
  $("stockAlerts").replaceChildren(...(lowStock.length ? lowStock.map((r) => {
    const card = el("article", undefined, "stock-alert-card");
    const state = el("span", undefined, "stock-alert-status");
    state.append(icon("stock-alert"), el("span", Number(r.saldo) <= 0 ? "Sem saldo" : Number(r.saldo) < Number(r.minimo) ? "Abaixo do mínimo" : "No mínimo"));
    const amounts = el("div", undefined, "stock-alert-values");
    const unit = ({
      unidade: "un.",
      rolo: "rolo",
      kg: "kg",
      metro: "m",
      litro: "L",
      caixa: "cx."
    })[r.unidade] || r.unidade || "un.";
    for (const [label, n] of[[`Saldo (${unit})`, r.saldo], [`Mínimo (${unit})`, r.minimo]]) {
      const group = el("div"); group.append(el("small", label), el("strong", numberBR(n))); amounts.append(group);
    }
    const actions = el("div", undefined, "attention-actions");
    actions.append(button("Consultar", () => openDashboardRecord(r), "", "right"));
    if (role !== "leitor") actions.append(button("Registrar entrada", () => openOperation("entrada", r), "", "stock-in"));
    card.append(el("h4", r.dados.item), state, amounts,
      el("p", [r.dados.ambiente, locationText(r)].filter(Boolean).join(" · "), "hint stock-alert-location"), actions);
    return card;
  }) : [el("p", active.some(r => r.controle === "QUANTIDADE") ? "Nenhum material precisa de reposição pelo mínimo definido." : "Os materiais com saldo baixo aparecerão aqui após o cadastro do estoque.", "dashboard-empty")]));
  syncDashboardList("stockAlerts", "toggleStockAlerts", 3, "materiais");
  $("recent").replaceChildren(
    ...[...rows]
    .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
    .slice(0, 5)
    .map((r) => {
      const n = el("div", undefined, "recent-row"),
      text = el("div");
      text.append(
        el("strong", r.dados.item),
        el("small", dateBR(r.criado_em)),
      );
      n.append(
        text,
        button(
          "Abrir",
          () => {
            if (!leaveEditor()) return;
            query({});
            $("search").value = internal(r.id);
            expanded = r.id;
            renderList();
          },
          "",
          "right",
        ),
      );
      return n;
    }),
  );
}

const IS_DEMO = document.body.dataset.demo === "true";
const PASSWORD_SYMBOLS = "!@#$%^&*()_+-=[]{};'\":\\|<>?,./`~";
let passwordChanging = false, accessSaving = false, firstAccessSaved = false;

function passwordRequirements(password) {
  return {
    length: Array.from(password).length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: Array.from(password).filter(c => PASSWORD_SYMBOLS.includes(c)).length >= 2,
  };
}

function mustChangePassword(person) {
  return person?.app_metadata?.acervo_primeiro_acesso === true;
}

function setPasswordVisibility(button, show) {
  $(button.dataset.passwordTarget).type = show ? "text" : "password";
  button.setAttribute("aria-label", (show ? "Ocultar " : "Mostrar ") + button.dataset.passwordLabel);
  button.setAttribute("aria-pressed", String(show));
  button.querySelector("use").setAttribute("href", show ? "#i-eye-off" : "#i-eye");
}

function resetPasswordVisibility() {
  document.querySelectorAll("[data-password-target]").forEach(button => setPasswordVisibility(button, false));
}

function updatePasswordRules() {
  const checks = passwordRequirements($("newPassword").value);
  document.querySelectorAll("[data-password-rule]").forEach(node =>
    node.classList.toggle("met", checks[node.dataset.passwordRule]));
  const met = Object.values(checks).filter(Boolean).length;
  $("passwordRuleProgress").value = met;
  $("passwordRuleCount").textContent = met + " de 5 requisitos atendidos";
  const confirmed = $("confirmPassword").value;
  const match = !!confirmed && confirmed === $("newPassword").value;
  $("passwordMatchHint").textContent = !confirmed ? "Digite a mesma senha nos dois campos." : match ? "As senhas coincidem." : "As senhas ainda estão diferentes.";
  $("passwordMatchHint").classList.toggle("matched", match);
  $("saveFirstPassword").disabled = passwordChanging ||
    !Object.values(checks).every(Boolean) ||
    $("newPassword").value !== $("confirmPassword").value;
}

function resetFirstAccess() {
  $("firstAccessForm").reset();
  firstAccessSaved = false;
  $("newPassword").disabled = $("confirmPassword").disabled = false;
  $("login").classList.remove("first-access-active");
  resetPasswordVisibility();
  $("firstAccess").hidden = true;
  $("loginForm").hidden = false;
  $("loginHeading").textContent = "Bem-vindo.";
  $("firstAccessMessage").textContent = "";
  passwordChanging = false;
  $("leaveFirstAccess").disabled = false;
  updatePasswordRules();
}

function showFirstAccess() {
  clearInterval(pollTimer);
  $("app").hidden = true;
  $("login").hidden = false;
  $("loginForm").hidden = true;
  $("firstAccess").hidden = false;
  $("login").classList.add("first-access-active");
  updatePasswordRules();
  $("loginHeading").textContent = "Defina sua senha.";
  $("loginMessage").textContent = "";
  $("loginButton").disabled = false;
  $("newPassword").focus();
}

let demoPeople = null;
async function accessService(body) {
  if (IS_DEMO) {
    if (body.acao === "trocar_senha") {
      if (!Object.values(passwordRequirements(body.senha || "")).every(Boolean))
      throw Error("A nova senha precisa atender aos requisitos indicados.");
      user.app_metadata = {
        ...user.app_metadata,
        acervo_primeiro_acesso: false
      };
      return {
        ok: true
      };
    }
    if (role !== "admin") throw Error("Somente administradores podem gerenciar pessoas.");
    if (!demoPeople) demoPeople = [
      {
        id: user.id,
        nome: "Administrador da demonstração",
        email: user.email,
        perfil: "admin",
        primeiro_acesso: false
      },
      {
        id: "22222222-2222-4222-8222-222222222222",
        nome: "Pessoa de exemplo",
        email: "pessoa.demo@acervo.invalid",
        perfil: "editor",
        primeiro_acesso: true
      }
    ];
    if (body.acao === "listar_usuarios") {
      const search = String(body.busca || "").toLowerCase();
      const all = demoPeople.filter(p => (p.nome + " " + p.email).toLowerCase().includes(search));
      return {
        ok: true,
        pessoas: all,
        total: all.length,
        pagina: 1,
        limite: 30,
        demonstracao: true
      };
    }
    if (body.acao === "criar_usuario") {
      if (demoPeople.some(p => p.email === body.email)) throw Error("Já existe uma conta com esse e-mail.");
      const person = {
        id: crypto.randomUUID(),
        nome: body.nome,
        email: body.email,
        perfil: body.perfil || "leitor",
        primeiro_acesso: true
      };
      demoPeople.push(person);
      return {
        ok: true,
        ...person,
        senha_inicial: "curitiba",
        demonstracao: true
      };
    }
    if (body.usuario === user.id) throw Error("Sua própria conta permanece como administradora.");
    const person = demoPeople.find(p => p.id === body.usuario);
    if (!person) throw Error("Essa conta não foi encontrada.");
    if (body.acao === "alterar_perfil") person.perfil = body.perfil;
    else if (body.acao === "excluir_usuario") demoPeople = demoPeople.filter(p => p.id !== body.usuario);
    else throw Error("Operação não reconhecida.");
    return {
      ok: true,
      demonstracao: true
    };
  }
  const {
    data,
    error
  } = await db.functions.invoke("acervo-acessos", {
    body
  });
  if (error) {
    let message = "Não foi possível concluir. O recurso de acesso precisa estar ativado pelo administrador.";
    try {
      const result = await error.context?.json();
      if (result?.message) message = result.message;
    } catch {}
    throw Error(message);
  }
  if (!data?.ok) throw Error(data?.message || "Não foi possível concluir a operação.");
  return data;
}

$("newPassword").oninput = updatePasswordRules;
$("confirmPassword").oninput = updatePasswordRules;
$("firstAccessForm").onsubmit = async event => {
  event.preventDefault();
  if (passwordChanging) return;
  const password = $("newPassword").value;
  if (!Object.values(passwordRequirements(password)).every(Boolean)) {
    $("firstAccessMessage").textContent = "Atenda a todos os requisitos da nova senha.";
    return;
  }
  if (new TextEncoder().encode(password).length > 72) {
    $("firstAccessMessage").textContent = "Essa senha ficou longa demais. Use até 72 caracteres comuns ou reduza os símbolos e letras acentuadas.";
    return;
  }
  if (password !== $("confirmPassword").value) {
    $("firstAccessMessage").textContent = "As duas senhas precisam ser iguais.";
    $("confirmPassword").focus();
    return;
  }
  if (password === "curitiba" || password === "Curitiba@01!") {
    $("firstAccessMessage").textContent = "Escolha uma senha diferente da senha inicial.";
    return;
  }
  passwordChanging = true;
  updatePasswordRules();
  $("leaveFirstAccess").disabled = true;
  $("firstAccessMessage").textContent = "";
  labelButton($("saveFirstPassword"), "Salvando…", "clock");
  const owner = user?.id;
  try {
    if (!firstAccessSaved) {
      await accessService({
        acao: "trocar_senha",
        senha: password
      });
      firstAccessSaved = true;
      $("newPassword").disabled = $("confirmPassword").disabled = true;
    }
    if (user?.id !== owner) return;
    toast("Senha salva. Entrando no Acervo…");
    let session;
    if (IS_DEMO) session = {
      user
    };
    else {
      const {
        data,
        error
      } = await db.auth.signInWithPassword({
        email: user.email,
        password,
      });
      if (error || !data?.session)
      throw Error("Sua senha foi salva, mas a conexão não permitiu entrar automaticamente. Tente entrar novamente.");
      session = data.session;
      if (session.user?.id !== owner) throw Error("Não foi possível confirmar a conta após salvar a senha.");
    }
    if (user?.id !== owner) return;
    resetFirstAccess();
    await loginReady(session);
    if (!$("app").hidden) toast("Senha salva. Bem-vindo ao Acervo!");
  } catch (error) {
    $("firstAccessMessage").textContent = error.message;
  } finally {
    passwordChanging = false;
    $("leaveFirstAccess").disabled = false;
    labelButton($("saveFirstPassword"), firstAccessSaved ? "Entrar no Acervo" : "Salvar senha e continuar", "lock");
    updatePasswordRules();
  }
};
$("leaveFirstAccess").onclick = async() => {
  if (passwordChanging) return;
  const {
    error
  } = await db.auth.signOut({
    scope: "local"
  });
  if (error) {
    $("firstAccessMessage").textContent = "Não foi possível sair. Tente novamente.";
    return;
  }
  endSession();
};
const PEOPLE_ROLES = {
  leitor: "Leitor",
  editor: "Operador",
  admin: "Administrador"
};
let accessMode = "list", peopleRows = [], peoplePage = 1, peopleTotal = 0,
  peopleLimit = 30, peopleRequest = 0, peopleSearchTimer = null,
  profileTarget = null, deleteTarget = null;

function personInitials(person) {
  return(person.nome || person.email || "?").trim().split(/\s+/).slice(0, 2).map(v => v[0]).join("").toUpperCase();
}

function setAccessView(mode) {
  if (mode !== "list") {
    ++peopleRequest;
    clearTimeout(peopleSearchTimer);
  }
  accessMode = mode;
  $("peoplePanel").hidden = mode !== "list";
  $("newUserForm").hidden = mode !== "create";
  $("personRoleForm").hidden = mode !== "profile";
  $("newUserResult").hidden = mode !== "result";
  $("accessBack").hidden = mode === "list";
  $("userAccessDialog").classList.toggle("creating-person", mode !== "list");
  $("newUserMessage").textContent = "";
  const labels = {
    list: ["Gerenciar pessoas", "Veja quem tem uma conta, escolha o perfil e gerencie os acessos ao Acervo.", "users"],
    create: ["Adicionar pessoa", "Crie uma conta com nome, e-mail e perfil. No primeiro acesso, a pessoa define sua própria senha.", "user-add"],
    profile: ["Alterar perfil", "Escolha o que essa pessoa poderá fazer no Acervo. A alteração vale para as próximas operações.", "shield-key"],
    result: ["Conta cadastrada", "Repasse o e-mail e a senha inicial à pessoa. Ela criará sua própria senha ao entrar.", "check"],
  };
  $("userAccessTitle").textContent = labels[mode][0];
  $("userAccessDescription").textContent = labels[mode][1];
  $("userAccessMark").querySelector("use").setAttribute("href", "#i-" + labels[mode][2]);
}

function resetPeopleManagement() {
  ++peopleRequest;
  clearTimeout(peopleSearchTimer);
  peopleRows = [];
  peoplePage = 1;
  peopleTotal = 0;
  profileTarget = null;
  deleteTarget = null;
  accessSaving = false;
  $("peopleSearch").value = "";
  $("peopleList").replaceChildren();
  $("peopleList").setAttribute("aria-busy", "false");
  $("peopleCount").textContent = "";
  $("peoplePagination").hidden = true;
  $("personRoleForm").reset();
  if ($("deletePersonDialog").open) $("deletePersonDialog").close();
  $("deletePersonName").textContent = $("deletePersonEmail").textContent = $("deletePersonMessage").textContent = "";
  $("profilePersonName").textContent = $("profilePersonEmail").textContent = $("profilePersonAvatar").textContent = "";
  $("newUserMessage").textContent = "";
  $("newUserForm").reset();
  $("newUserResult").replaceChildren();
  setPeopleBusy(false);
  labelButton($("newUserSave"), "Cadastrar pessoa", "user-add");
  labelButton($("savePersonRole"), "Salvar perfil", "check");
  labelButton($("confirmPersonDelete"), "Excluir pessoa", "discard");
  setAccessView("list");
}

function setPeopleBusy(value) {
  accessSaving = value;
  for (const id of["closeUserAccess", "accessBack", "newUserSave", "savePersonRole", "cancelPersonRole", "confirmPersonDelete", "cancelPersonDelete"])
  $(id).disabled = value;
  $("newUserForm").setAttribute("aria-busy", String(value));
  $("personRoleForm").setAttribute("aria-busy", String(value));
}

function renderPeople() {
  const nodes = peopleRows.map(person => {
    const row = el("div", undefined, "people-row");
    const avatar = el("span", personInitials(person), "people-avatar"); avatar.setAttribute("aria-hidden", "true");
    const info = el("div", undefined, "people-person");
    const name = el("div", person.nome || person.email, "people-name");
    const self = person.id === user?.id;
    if (self) name.append(el("span", "Você", "people-self"));
    const meta = el("div", undefined, "people-meta");
    meta.append(el("span", PEOPLE_ROLES[person.perfil] || "Sem acesso", "people-role " + (person.perfil || "unassigned")));
    if (person.perfil) meta.append(el("span", person.primeiro_acesso ? "Primeiro acesso pendente" : "Acesso liberado", "people-status"));
    info.append(name, el("p", person.email, "people-email"), meta);
    const actions = el("div", undefined, "people-actions");
    const profile = el("button"); profile.type = "button";
    labelButton(profile, person.perfil ? "Alterar perfil" : "Liberar acesso", "shield-key");
    profile.disabled = self; profile.setAttribute("aria-label", (person.perfil ? "Alterar perfil de " : "Liberar acesso de ") + (person.nome || person.email));
    if (self) profile.title = "Sua conta permanece como administradora.";
    profile.onclick = () => editPersonRole(person);
    const remove = el("button", undefined, "danger"); remove.type = "button";
    labelButton(remove, "Excluir", "discard"); remove.disabled = self;
    remove.setAttribute("aria-label", "Excluir " + (person.nome || person.email));
    if (self) remove.title = "Você não pode excluir sua própria conta.";
    remove.onclick = () => confirmPersonRemoval(person);
    actions.append(profile, remove); row.append(avatar, info, actions); return row;
  });
  $("peopleList").replaceChildren(...(nodes.length ? nodes : [acervoEmpty("Ainda não encontramos por aqui.", "Tente outro nome ou e-mail. Para um novo acesso, use Adicionar pessoa.")]));
  $("peopleCount").textContent = peopleTotal + (peopleTotal === 1 ? " pessoa" : " pessoas");
  const pages = Math.max(1, Math.ceil(peopleTotal / peopleLimit));
  $("peoplePagination").hidden = pages <= 1;
  $("peoplePage").textContent = peoplePage + " de " + pages;
  $("peoplePrevious").disabled = peoplePage <= 1;
  $("peopleNext").disabled = peoplePage >= pages;
}

function showPeopleLoading() {
  const loading = el("div", undefined, "people-loading"),
    status = el("p", undefined, "people-loading-status"),
    spinner = acervoBooks();
  spinner.setAttribute("aria-hidden", "true");
  status.setAttribute("role", "status");
  status.append(spinner, el("span", "Quem cuida do acervo está chegando."));
  loading.append(status);
  for (let i = 0; i < 3; i++) {
    const row = el("div", undefined, "people-skeleton"),
      copy = el("div", undefined, "people-skeleton-copy");
    row.setAttribute("aria-hidden", "true");
    copy.append(el("span", undefined, "people-skeleton-line"), el("span", undefined, "people-skeleton-line"));
    row.append(el("span", undefined, "people-skeleton-avatar"), copy);
    loading.append(row);
  }
  $("peopleCount").textContent = "";
  $("peopleList").replaceChildren(loading);
}

async function loadPeople(page = peoplePage) {
  if (role !== "admin" || !$('userAccessDialog').open) return;
  clearTimeout(peopleSearchTimer);
  const request = ++peopleRequest,
    owner = user?.id;
  $("newUserMessage").textContent = "";
  $("peopleList").setAttribute("aria-busy", "true");
  showPeopleLoading();
  $("peoplePagination").hidden = true;
  try {
    const result = await accessService({
      acao: "listar_usuarios",
      busca: $("peopleSearch").value.trim(),
      pagina: page
    });
    if (request !== peopleRequest || owner !== user?.id || !$('userAccessDialog').open) return;
    peopleRows = result.pessoas || [];
    peoplePage = result.pagina || 1;
    peopleTotal = result.total || 0;
    peopleLimit = result.limite || 30;
    renderPeople();
  } catch (error) {
    if (request !== peopleRequest || owner !== user?.id || !$('userAccessDialog').open) return;
    peopleRows = [];
    $("peopleCount").textContent = "";
    $("peopleList").replaceChildren(el("p", "A lista não pôde ser carregada. Use Atualizar para tentar novamente.", "people-empty"));
    $("newUserMessage").textContent = error.message;
  } finally {
    if (request === peopleRequest && owner === user?.id) $("peopleList").setAttribute("aria-busy", "false");
  }
}

function returnToPeople() {
  if (accessSaving) return;
  profileTarget = null;
  setAccessView("list");
  loadPeople();
  $("peopleSearch").focus();
}

function editPersonRole(person) {
  if (role !== "admin" || accessSaving || person.id === user?.id) return;
  profileTarget = person;
  $("personRoleForm").reset();
  $("profilePersonAvatar").textContent = personInitials(person);
  $("profilePersonName").textContent = person.nome || person.email;
  $("profilePersonEmail").textContent = person.email;
  $("personRoleForm").querySelector(`input[value="${PEOPLE_ROLES[person.perfil] ? person.perfil : "leitor"}"]`).checked = true;
  setAccessView("profile");
  $("personRoleForm").querySelector("input:checked").focus();
}

function confirmPersonRemoval(person) {
  if (role !== "admin" || accessSaving || person.id === user?.id) return;
  deleteTarget = person;
  $("deletePersonName").textContent = person.nome || person.email;
  $("deletePersonEmail").textContent = person.email;
  $("deletePersonMessage").textContent = "";
  $("deletePersonDialog").showModal();
  $("cancelPersonDelete").focus();
}

$("manageAccess").onclick = () => {
  if (role !== "admin" || busy || pending) return;
  resetPeopleManagement();
  $("userAccessDialog").showModal();
  loadPeople(1);
  $("peopleSearch").focus();
};
$("closeUserAccess").onclick = () => {
  if (!accessSaving) $("userAccessDialog").close();
};
$("userAccessDialog").addEventListener("cancel", event => {
  if (accessSaving) event.preventDefault();
});
$("userAccessDialog").addEventListener("close", () => {
  ++peopleRequest; clearTimeout(peopleSearchTimer);
});
$("peopleSearch").oninput = () => {
  clearTimeout(peopleSearchTimer);
  peopleSearchTimer = setTimeout(() => loadPeople(1), 300);
};
$("refreshPeople").onclick = () => loadPeople();
$("peoplePrevious").onclick = () => loadPeople(peoplePage - 1);
$("peopleNext").onclick = () => loadPeople(peoplePage + 1);
$("accessBack").onclick = $("cancelPersonRole").onclick = returnToPeople;
$("addPerson").onclick = () => {
  if (accessSaving) return;
  $("newUserForm").reset();
  $("newUserResult").replaceChildren();
  setAccessView("create");
  $("newUserName").focus();
};
$("newUserForm").onsubmit = async event => {
  event.preventDefault();
  if (role !== "admin" || accessSaving || !$("newUserForm").reportValidity()) return;
  setPeopleBusy(true);
  $("newUserMessage").textContent = "";
  labelButton($("newUserSave"), "Cadastrando…", "clock");
  const owner = user?.id;
  try {
    const result = await accessService({
      acao: "criar_usuario",
      nome: $("newUserName").value.trim(),
      email: $("newUserEmail").value.trim(),
      perfil: new FormData($("newUserForm")).get("newUserRole")
    });
    if (user?.id !== owner) return;
    const resultTitle = el("strong", "Conta cadastrada.");
    resultTitle.prepend(icon("check"));
    $("newUserResult").replaceChildren(resultTitle, el("p", result.email), el("p", "Senha inicial: " + result.senha_inicial),
      el("p", "Perfil: " + (PEOPLE_ROLES[result.perfil] || "Leitor")), el("p", "No primeiro acesso, a pessoa criará sua própria senha."));
    setAccessView("result");
  } catch (error) {
    if (user?.id === owner) $("newUserMessage").textContent = error.message;
  }
  finally {
    if (user?.id === owner) {
      setPeopleBusy(false);
      labelButton($("newUserSave"), "Cadastrar pessoa", "user-add");
    }
  }
};
$("personRoleForm").onsubmit = async event => {
  event.preventDefault();
  if (role !== "admin" || accessSaving || !profileTarget) return;
  const owner = user?.id,
    id = profileTarget.id;
  setPeopleBusy(true);
  $("newUserMessage").textContent = "";
  labelButton($("savePersonRole"), "Salvando…", "clock");
  try {
    await accessService({
      acao: "alterar_perfil",
      usuario: id,
      perfil: new FormData($("personRoleForm")).get("personRole")
    });
    if (user?.id !== owner) return;
    setAccessView("list");
    await loadPeople();
    toast("Perfil de acesso atualizado.");
  } catch (error) {
    if (user?.id === owner) $("newUserMessage").textContent = error.message;
  }
  finally {
    if (user?.id === owner) {
      setPeopleBusy(false);
      labelButton($("savePersonRole"), "Salvar perfil", "check");
    }
  }
};
$("cancelPersonDelete").onclick = () => {
  if (!accessSaving) $("deletePersonDialog").close();
};
$("deletePersonDialog").addEventListener("cancel", event => {
  if (accessSaving) event.preventDefault();
});
$("confirmPersonDelete").onclick = async() => {
  if (role !== "admin" || accessSaving || !deleteTarget) return;
  const owner = user?.id,
    id = deleteTarget.id;
  setPeopleBusy(true);
  $("deletePersonMessage").textContent = "";
  labelButton($("confirmPersonDelete"), "Excluindo…", "clock");
  try {
    await accessService({
      acao: "excluir_usuario",
      usuario: id
    });
    if (user?.id !== owner) return;
    $("deletePersonDialog").close();
    deleteTarget = null;
    await loadPeople();
    toast("Pessoa excluída. O histórico foi preservado.");
  } catch (error) {
    if (user?.id === owner) {
      $("deletePersonMessage").textContent = error.message;
      await loadPeople();
    }
  } finally {
    if (user?.id === owner) {
      setPeopleBusy(false);
      labelButton($("confirmPersonDelete"), "Excluir pessoa", "discard");
    }
  }
};

async function loginReady(session, initialPassword = false) {
  if (!session?.user?.id)
  throw Error("Sessão inválida. Entre novamente.");
  if (user && user.id !== session.user.id) endSession();
  let verified = session.user;
  if (!IS_DEMO) {
    const {
      data,
      error
    } = await db.auth.getUser();
    if (error || !data?.user || data.user.id !== session.user.id)
    throw Error("Não foi possível verificar sua sessão. Entre novamente.");
    verified = data.user;
  }
  user = initialPassword ? {
    ...verified,
    app_metadata: {
      ...verified.app_metadata,
      acervo_primeiro_acesso: true
    }
  } : verified;
  if (mustChangePassword(user)) {
    showFirstAccess();
    return;
  }
  resetFirstAccess();
  pending = storage("pending");
  const userDisplayName = String(user.user_metadata?.nome || shortEmail(user.email)).trim() || "Pessoa";
  $("account").textContent = userDisplayName;
  $("account").title = userDisplayName;
  $("accountAvatar").textContent = userDisplayName.charAt(0).toLocaleUpperCase("pt-BR");
  $("accountRole").textContent = "Acesso ao Acervo";
  $("login").hidden = true;
  $("app").hidden = false;
  $("logout").hidden = false;
  try {
    await refresh(true);
    restoreDraft();
    syncFieldIdentity();
    setBusy(false);
    if (role === "leitor") showTab("browse");
    startPolling();
    if (mobileCamera()) {
      warmBarcode();
      warmOCR();
    }
  } catch (e) {
    $("app").hidden = true;
    $("login").hidden = false;
    $("loginMessage").textContent = e.message;
  }
}

function initForm() {
  mountControlFields($("controlHost"));
  const rest = $("formRest"),
    fields = $("fields");
  const roomStep = $("rooms").closest(".step");
  const identityStep = $("types").closest(".step");
  const header = el("div");
  header.id = "registrationHeader";
  const bar = $("register").querySelector(".workspace > .card > .bar");
  const rooms = $("rooms").closest("fieldset");
  rooms.id = "registrationRooms";
  header.append(bar.querySelector("h2"), rooms);
  bar.remove();
  const body = el("div");
  body.id = "registrationBody";
  const main = el("div");
  main.id = "registrationMain";
  const item = el("div");
  item.id = "registrationItem";
  item.append($("item").previousElementSibling, $("item"), $("suggestions"), $("learningHint"));
  item.querySelector("label").prepend(icon("draft"));
  const category = $("categories").closest("fieldset");
  category.id = "registrationCategory";
  category.querySelector("legend").prepend(icon("composition"));
  const identity = $("types").closest("fieldset");
  identity.id = "identityBlock";
  identity.classList.remove("spaced");
  const control = $("controlHost");
  control.classList.remove("step");
  identity.querySelector("legend").after(registrationGroupHeading("identityHeading", "Identificação", "Qual código identifica o item?", "code"));
  control.prepend(registrationGroupHeading("controlHeading", "Controle", "Como acompanhar o item?", "stock"));
  const notes = $("notesBlock"),
    location = $("location"),
    code = $("codeWrap");
  main.append(item, category, rest, notes);
  identity.append(code);
  rest.replaceChildren(identity, control);
  body.append(location, main);
  roomStep.remove();
  identityStep.remove();
  fields.prepend(header, body);
  $("itemForm").addEventListener("input", updateRegistrationSummary);
  $("itemForm").addEventListener("change", updateRegistrationSummary);
  $("discardRegistration").onclick = openRegistrationDiscard;
  $("directReason").addEventListener("input", saveDraft);
  $("registrationDiscardDialog").addEventListener("cancel", event => {
    if (busy) event.preventDefault();
  });
  $("registrationDiscardForm").onsubmit = event => {
    event.preventDefault();
    if (!busy && $("registrationDiscardForm").reportValidity() && $("itemForm").reportValidity() && saveRecord("", true))
    $("registrationDiscardDialog").close();
  };
  $("moveSearch").oninput = renderMovementResults;
  $("moveScan").hidden = !mobileCamera();
  $("moveScan").onclick = () => openScanner("moveSearch");
  $("createDown").onclick = () => {
    if (
      clean($("item").value) &&
      !confirm("Substituir o rascunho atual por um cadastro de item descartado?")
    )
    return;
    $("repeat").checked = false;
    resetForm();
    showTab("register");
    syncDirectDown();
    toast("Preencha a ficha e use Descartar para concluir.");
    const q = $("moveSearch").value.trim();
    if (/^\d{6}$/.test(q)) $("code").value = q;
    $("item").focus();
    saveDraft();
  };
  choices(
    $("categories"),
    "category",
    CATEGORIES.map((v) => [v, v, CATEGORY_ICON[v]]),
    "",
    () => {
      manual.categoria = true;
    },
  );
  choices(
    $("types"),
    "type",
    Object.entries(TYPE).map(([v, t]) => [v, t, TYPE_ICON[v]]),
    "",
    () => {
      manual.tipo = true;
      $("code").value = "";
      syncCode();
    },
  );
  choices(
    $("rooms"),
    "room",
    ROOMS.map((v) => [v, v, ROOM_ICON[v]]),
    ROOMS[0],
    () => {
      syncLocation();
      syncControl();
    },
  );
  choices(
    $("shelves"),
    "shelf",
    [..."ABCDE"],
    "",
    () => syncLocation(),
    false,
  );
  choices(
    $("levels"),
    "level",
    [1, 2, 3, 4, 5, 6].map((v) => [
      String(v),
      String(v).padStart(2, "0"),
    ]),
    "",
    () => syncLocation(),
    false,
  );
  syncForm();
  renderFilters();
  renderList();
}

$("item").oninput = () => {
  learnItem();
  suggestions();
};
$("item").onfocus = suggestions;
$("item").onkeydown = (e) => {
  if (e.key === "Escape") {
    $("suggestions").hidden = true;
    $("item").setAttribute("aria-expanded", "false");
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    $("suggestions").querySelector("button")?.focus();
  }
};
document.addEventListener("click", (e) => {
  if (!e.target.closest("#suggestions") && e.target !== $("item")) {
    $("suggestions").hidden = true;
    $("item").setAttribute("aria-expanded", "false");
  }
});
$("code").oninput = () => {
  $("code").value = $("code").value.replace(/\D/g, "").slice(0, 6);
  scanTarget = "code";
  duplicateHint();
};
$("itemForm").addEventListener("input", saveDraft);
$("itemForm").addEventListener("change", saveDraft);
$("itemForm").onsubmit = (e) => {
  e.preventDefault();
  if (!busy && role !== "leitor" && $("itemForm").reportValidity())
  saveRecord();
};
$("operationForm").onsubmit = (e) => {
  e.preventDefault();
  if (!busy && $("operationForm").reportValidity())
  commit({
    acao: action,
    id: selected.id,
    versao: selected.versao,
    motivo: $("reason").value.trim(),
    data: $("downDate").value,
    documento: $("document").value.trim(),
    quantidade: $("moveQuantity").value,
    responsavel: $("movePerson").value.trim(),
    destino: $("moveDestination").value.trim(),
  });
};
$("search").oninput = () => {
  if (editor) {
    $("listNotice").hidden = false;
    return;
  }
  page = 1;
  expanded = null;
  renderList();
};
$("viewDiscarded").onclick = () => query({
  situacao: "BAIXADO"
});
$("moreFilters").onclick = () => {
  $("filterPanel").hidden = !$("filterPanel").hidden;
  $("moreFilters").setAttribute(
    "aria-expanded",
    String(!$("filterPanel").hidden),
  );
};
$("clearFilters").onclick = () => {
  if (!leaveEditor()) return;
  Object.keys(filters).forEach((k) => (filters[k] = ""));
  $("search").value = "";
  page = 1;
  expanded = null;
  renderFilters();
  renderList();
};
$("previous").onclick = () => {
  if (leaveEditor()) {
    page = Math.max(1, page - 1);
    expanded = null;
    renderList();
  }
};
$("next").onclick = () => {
  if (leaveEditor()) {
    page++;
    expanded = null;
    renderList();
  }
};
document
  .querySelectorAll("[data-tab]")
  .forEach((b) => (b.onclick = () => showTab(b.dataset.tab)));
document.querySelectorAll("[data-close]").forEach(
  (b) =>
  (b.onclick = () => {
    if (!busy) $(b.dataset.close).close();
  }),
);
$("operation").addEventListener("cancel", (e) => {
  if (busy) e.preventDefault();
});
$("refresh").onclick = async() => {
  if (busy) return;
  try {
    await refresh(true);
    toast("Dados atualizados.");
  } catch (e) {
    toast(e.message, true);
  }
};
$("retry").onclick = transmit;
$("exportAll").onclick = () => exportExcel(true);
$("exportFiltered").onclick = () => exportExcel(false);
$("loginForm").onsubmit = async(e) => {
  e.preventDefault();
  if ($("loginButton").disabled) return;
  $("loginButton").disabled = true;
  $("loginButton").classList.add("loading");
  $("loginButton").setAttribute("aria-busy", "true");
  labelButton($("loginButton"), "Entrando…", "lock");
  $("loginMessage").textContent = "";
  try {
    if (!db) throw Error("Conexão indisponível. Atualize a página.");
    const {
      data,
      error
    } = await db.auth.signInWithPassword({
      email: $("email").value.trim(),
      password: $("password").value,
    });
    if (error) throw error;
    const initialPassword = ["curitiba", "Curitiba@01!"].includes($("password").value);
    $("password").value = "";
    await loginReady(data.session, initialPassword);
  } catch (e) {
    $("loginMessage").textContent = e.message;
  } finally {
    $("loginButton").disabled = false;
    $("loginButton").classList.remove("loading");
    $("loginButton").removeAttribute("aria-busy");
    labelButton($("loginButton"), "Entrar", "lock");
  }
};

function endSession() {
  resetFirstAccess();
  if ($("registrationDiscardDialog").open) $("registrationDiscardDialog").close();
  finishEdit();
  clearTimeout(toastTimer);
  $("toast").hidden = true;
  if ($("userAccessDialog").open) $("userAccessDialog").close();
  resetPeopleManagement();
  demoPeople = null;
  $("inventoryDetails").open = false;
  setAcervoSync(false);
  for (const id of["stockAlerts", "movementTimeline"]) $(id).classList.remove("expanded");
  $("toggleStockAlerts").hidden = $("toggleMovementTimeline").hidden = true;
  $("newUserForm").reset();
  $("newUserResult").replaceChildren();
  $("newUserResult").hidden = true;
  $("manageAccess").hidden = true;
  clearInterval(pollTimer);
  storage("draft", null);
  closeScanner();
  timelineGeneration++;
  timelineCache.clear();
  pending = null;
  selected = null;
  action = "";
  role = "leitor";
  resetForm();
  $("password").value = "";
  $("moveSearch").value = "";
  $("search").value = "";
  $("saved").replaceChildren();
  $("saved").hidden = true;
  for (const id of[
    "moveResults",
    "movementTimeline",
    "stats",
    "secondaryStats",
    "roomChart",
    "categoryChart",
    "typeChart",
    "topChart",
    "recent",
    "rackMap",
    "availability",
    "stockAlerts",
    "suggestions",
  ])
  $(id)?.replaceChildren();
  user = null;
  rows = [];
  checks = [];
  editor = null;
  expanded = null;
  lastSnapshot = "";
  $("app").hidden = true;
  $("login").hidden = false;
  $("logout").hidden = true;
  $("account").textContent = "Sessão encerrada";
  $("account").removeAttribute("title");
  $("accountAvatar").textContent = "A";
  $("accountRole").textContent = "Acesso ao Acervo";
  $("results").replaceChildren();
  if ($("operation").open) $("operation").close();
}

$("logout").onclick = async() => {
  if (busy || !leaveEditor()) return;
  if (pending)
  return toast(
    "Conclua a operação pendente em Verificar e concluir antes de sair.",
    true,
  );
  try {
    const {
      error
    } = await db.auth.signOut({
      scope: "local"
    });
    if (error) throw error;
    endSession();
  } catch {
    toast("Não foi possível encerrar a sessão. Tente novamente.", true);
  }
};
db?.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_OUT") endSession();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    saveDraft();
    closeScanner();
  } else if (user && !busy) refresh().catch(() => {});
});
window.addEventListener("online", () => {
  if (user && !busy) refresh().catch(() => {});
});
window.addEventListener("pagehide", () => {
  saveDraft();
  closeScanner();
});

function excelDate(value) {
  if (!value) return null;
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
    .formatToParts(new Date(value))
    .map((x) => [x.type, x.value]),
  );
  return new Date(
    Date.UTC(
      +p.year,
      +p.month - 1,
      +p.day,
      +p.hour,
      +p.minute,
      +p.second,
    ),
  );
}

async function exportExcel(all) {
  if (busy) return;
  setBusy(true, "Aguarde…");
  const exportVisual = setAcervoSync(true, "Montando seu acervo em planilha…");
  try {
    await refresh();
    if (!window.ExcelJS)
    throw Error("A biblioteca do Excel ainda não carregou. Tente novamente.");
    const emitted = new Date();
    const list = all ? [...rows] : filtered();
    const active = list.filter((r) => r.situacao === "ATIVO");
    const withoutId = active.filter((r) => r.dados.tipo === "SEM_IDENTIFICACAO");
    const checked = ROOMS.filter((room) => checks.some((c) => c.ambiente === room && c.conferido)).length;
    const wb = new ExcelJS.Workbook();
    wb.creator = "ACERVO";
    wb.created = emitted;
    wb.modified = emitted;
    wb.subject = "Gestão de bens e materiais · Curitiba";
    wb.calcProperties.fullCalcOnLoad = true;
    const color = {
      green: "FF075099",
      lime: "FFB6E4FF",
      ink: "FF153957",
      muted: "FF607489",
      soft: "FFF4F8FC",
      paper: "FFF3F5F7",
      white: "FFFFFFFF",
      line: "FFD3E1ED",
      amber: "FF99642C",
      warning: "FFFCF5E8",
      chart: "FF357CAF",
      neutral: "FFE4EAF0",
    };
    const filterNames = {
      controle: "Controle",
      ambiente: "Ambiente",
      categoria: "Categoria",
      tipo: "Identificação",
      situacao: "Situação",
      estante: "Estante",
      prateleira: "Prateleira",
      dia: "Cadastro",
      item: "Item",
    };
    const scope = all ? "Inventário completo" : (
      Object.entries(filters).filter(([, v]) => v).map(([k, v]) =>
        (filterNames[k] || k) + ": " + (TYPE[v] || (v === "TODOS" ? "Todos os registros" : STATUS[v]) ||
          ({
            EM_USO: "Em uso",
            INDIVIDUAL: "Individual",
            QUANTIDADE: "Por quantidade"
          })[v] || v)
      ).concat(!filters.situacao ? ["Situação: Lista corrente (sem arquivados)"] : [])
      .concat($("search").value ? ["Busca: " + $("search").value] : []).join(" · ") || "Lista corrente"
    );
    const issued = dateBR(emitted);
    const shortDate = (v) => v ? new Intl.DateTimeFormat("pt-BR", {
      timeZone: ZONE,
      dateStyle: "short",
    }).format(new Date(v)) : "";
    const fill = (argb) => ({
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb
      }
    });
    function text(ws, range, value, options = {}) {
      if (range.includes(":")) ws.mergeCells(range);
      const cell = ws.getCell(range.split(":")[0]);
      cell.value = value;
      cell.font = {
        name: options.serif ? "Georgia" : "Arial",
        size: options.size || 11,
        color: {
          argb: options.fg || color.ink
        },
        bold: !!options.bold,
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: options.align || "left",
        wrapText: true,
        indent: options.indent || 0,
      };
      if (options.bg) cell.fill = fill(options.bg);
      if (options.border) cell.border = options.border;
      return cell;
    }
    function paint(ws, firstRow, lastRow, firstCol, lastCol, bg) {
      for (let r = firstRow; r <= lastRow; r++)
      for (let c = firstCol; c <= lastCol; c++) ws.getCell(r, c).fill = fill(bg);
    }
    const measure = document.createElement("canvas").getContext("2d");
    measure.font = "14.67px Arial";
    function wrap(value, pixels) {
      const lines = [];
      String(value ?? "").split(/\r?\n/).forEach((paragraph) => {
        let line = "";
        for (const word of paragraph.split(/\s+/).filter(Boolean)) {
          const next = line ? line + " " + word : word;
          if (measure.measureText(next).width <= pixels) {
            line = next; continue;
          }
          if (line) {
            lines.push(line); line = "";
          }
          let part = "";
          for (const ch of word) {
            if (part && measure.measureText(part + ch).width > pixels) {
              lines.push(part); part = "";
            }
            part += ch;
          }
          line = part;
        }
        lines.push(line);
      });
      return lines;
    }
    let logoId = null;
    const logo = document.querySelector('img[src*="favicon.svg"]');
    if (logo?.complete && logo.naturalWidth) {
      try {
        const image = document.createElement("canvas");
        image.width = image.height = 128;
        image.getContext("2d").drawImage(logo, 0, 0, 128, 128);
        logoId = wb.addImage({
          base64: image.toDataURL("image/png"),
          extension: "png"
        });
      } catch {}
    }
    const municipalityMark = document.querySelector(".institution-logo");
    const municipalityLogoId = municipalityMark
      ? wb.addImage({
        base64: municipalityMark.src,
        extension: "png"
      }) : null;
    function addLogo(ws, start, col = 0, colOff = 7200, rowOff = 18000) {
      if (logoId === null) return;
      let endRow = start - 1,
        endOff = rowOff + 31 * 9525;
      while (endOff >= (ws.getRow(endRow + 1).height || 15) * 12700) {
        endOff -= (ws.getRow(endRow + 1).height || 15) * 12700;
        endRow++;
      }
      ws.addImage(logoId, {
        tl: {
          nativeCol: col,
          nativeColOff: colOff,
          nativeRow: start - 1,
          nativeRowOff: rowOff
        },
        br: {
          nativeCol: col,
          nativeColOff: colOff + 31 * 9525,
          nativeRow: endRow,
          nativeRowOff: Math.round(endOff)
        },
        editAs: "oneCell",
      });
    }
    function brand(ws, start, lastCol) {
      const edge = ws.getColumn(lastCol).letter;
      const left = Math.min(2, lastCol - 2);
      text(ws, "A" + start + ":" + ws.getColumn(left).letter + start, "ACERVO", {
        size: 13,
        fg: color.green,
        indent: 0,
      });
      text(ws, "A" + (start + 1) + ":" + ws.getColumn(left).letter + (start + 1), "Prefeitura de Curitiba", {
        size: 9,
        fg: color.muted,
        indent: 0,
      });
      const right = ws.getColumn(left + 1).letter;
      text(ws, right + start + ":" + edge + start, "Emitido em " + issued, {
        size: 9,
        fg: color.muted,
        align: "right"
      });
      text(ws, right + (start + 1) + ":" + edge + (start + 1), {
        text: "Voltar ao resumo",
        hyperlink: "#'Resumo'!A1"
      }, {
        size: 9,
        fg: color.green,
        align: "right"
      });
      ws.getRow(start).height = 23;
      ws.getRow(start + 1).height = 16;
    }
    function banner(ws, title, lastCol) {
      brand(ws, 1, lastCol);
      const edge = ws.getColumn(lastCol).letter;
      text(ws, "A3:" + edge + "3", title, {
        size: 22,
        bold: true,
        fg: color.green
      });
      ws.getRow(3).height = 40;
      text(ws, "A4:" + edge + "4", scope, {
        size: 9,
        fg: color.muted,
        border: {
          bottom: {
            style: "thin",
            color: {
              argb: color.line
            }
          }
        },
      });
      const width = ws.columns.slice(0, lastCol).reduce((n, c) => n + c.width * 7, 0);
      ws.getRow(4).height = Math.max(25, wrap(scope, width - 20).length * 12 + 10);
      ws.getRow(6).height = 10;
    }
    const inventoryHeaders = [
      "Código interno", "Item", "Categoria", "Identificação", "Código externo",
      "Ambiente", "Posição", "Situação", "Observação", "Cadastrado em (Curitiba)",
      "Série anterior", "Localização anterior", "Controle", "Saldo", "Unidade", "Mínimo",
    ];
    const inventoryRow = (r) => [
      internal(r.id), r.dados.item, r.dados.categoria, TYPE[r.dados.tipo] || r.dados.tipo,
      String(r.dados.codigo || ""), r.dados.ambiente, locationText(r), STATUS[r.situacao] || r.situacao,
      r.dados.observacao || "", excelDate(r.criado_em),
      r.legado?.numero_serie || "", r.legado?.localizacao || "",
      r.controle === "QUANTIDADE" ? "Por quantidade" : "Individual",
      r.controle === "QUANTIDADE" ? Number(r.saldo) : null,
      r.controle === "QUANTIDADE" ? (r.unidade || "") : "",
      r.controle === "QUANTIDADE" ? Number(r.minimo) : null,
    ];
    function table(name, tableName, headers, data, widths, options = {}) {
      const shown = options.printCols || (options.details ? 8 : headers.length);
      const ws = wb.addWorksheet(name, {
        properties: {
          tabColor: {
            argb: options.tabColor || color.green
          }
        },
        views: [{
          state: "frozen",
          ySplit: 7,
          xSplit: 2,
          topLeftCell: "C8",
          showGridLines: false,
          zoomScale: 90
        }],
        pageSetup: {
          paperSize: 9,
          orientation: "landscape",
          fitToPage: true,
          fitToWidth: 1,
          fitToHeight: 0,
          printTitlesRow: "7:7",
          margins: {
            left: 0.3,
            right: 0.3,
            top: 0.35,
            bottom: 0.35,
            header: 0.15,
            footer: 0.15
          },
        },
        headerFooter: {
          oddFooter: "&LACERVO&C" + shortDate(emitted) + "&RPágina &P de &N"
        },
      });
      ws.columns = widths.map((width) => ({
        width
      }));
      banner(ws, name, shown);
      text(ws, "A5:B5", data.length ? {
        formula: 'SUBTOTAL(103,A8:A' + (data.length + 7) + ')&" registros visíveis"',
        result: data.length + " registros visíveis",
      } : "0 registros", {
        size: 10,
        fg: color.muted
      });
      text(ws, "C5:" + ws.getColumn(shown).letter + "5", options.details
        ? "Filtre nos títulos. Role à direita para observações, datas e estoque."
        : "Filtre pelos cabeçalhos", {
          size: 9,
          fg: color.muted,
          align: "right"
        });
      ws.getRow(5).height = 26;
      if (data.length) ws.addTable({
        name: tableName,
        ref: "A7",
        headerRow: true,
        totalsRow: false,
        style: {
          theme: null,
          showRowStripes: false,
          showColumnStripes: false
        },
        columns: headers.map((name) => ({
          name,
          filterButton: true
        })),
        rows: data,
      });
      else {
        ws.getRow(7).values = headers;
        ws.autoFilter = {
          from: "A7",
          to: ws.getColumn(headers.length).letter + "7"
        };
        text(ws, "A8:" + ws.getColumn(shown).letter + "8", "Nenhum registro neste recorte.", {
          size: 11,
          fg: color.muted,
          bg: color.soft,
          indent: 1,
        });
        ws.getRow(8).height = 40;
      }
      ws.getRow(7).height = 33;
      for (let j = 1; j <= headers.length; j++) {
        const cell = ws.getCell(7, j);
        cell.fill = fill(color.green);
        cell.font = {
          name: "Arial",
          size: 10,
          bold: true,
          color: {
            argb: color.white
          }
        };
        cell.alignment = {
          vertical: "middle",
          wrapText: true,
          indent: 1
        };
        cell.border = {
          right: {
            style: "hair",
            color: {
              argb: "FF667581"
            }
          }
        };
      }
      data.forEach((values, i) => {
        const row = ws.getRow(i + 8);
        row.height = Math.min(409, Math.max(31, ...values.map((v, j) =>
          v instanceof Date ? 31 : wrap(v && typeof v === "object" ? (v.result ?? v.text ?? "") : v, widths[j] * 7 - 18).length * 14 + 10
        )));
        for (let j = 1; j <= headers.length; j++) {
          const cell = row.getCell(j);
          const missing = options.details && j === 4 && values[3] === TYPE.SEM_IDENTIFICACAO;
          cell.fill = fill(missing ? color.warning : i % 2 ? color.soft : color.white);
          cell.font = {
            name: "Arial",
            size: 11,
            bold: j === 1,
            color: {
              argb: missing ? color.amber : color.ink
            },
          };
          cell.alignment = {
            vertical: "middle",
            horizontal: typeof cell.value === "number" ? "right" : "left",
            wrapText: true,
            indent: 1
          };
          if (typeof cell.value === "number") cell.numFmt = Number.isInteger(cell.value) ? "#,##0" : "#,##0.###";
          cell.border = {
            bottom: {
              style: "hair",
              color: {
                argb: color.line
              }
            }
          };
          if ((options.dates || []).includes(j)) cell.numFmt = options.dateOnly ? "dd/mm/yyyy" : "dd/mm/yyyy hh:mm:ss";
          else if (typeof cell.value === "string") cell.numFmt = "@";
        }
      });
      if (options.details) {
        ws.properties.outlineLevelCol = 1;
        for (let c = 11; c <= 12; c++) {
          ws.getColumn(c).outlineLevel = 1;
          ws.getColumn(c).hidden = true;
        }
      }
      ws.pageSetup.printArea = "A1:" + ws.getColumn(shown).letter + Math.max(8, data.length + 7);
      return ws;
    }
    const summary = wb.addWorksheet("Resumo", {
      properties: {
        tabColor: {
          argb: color.green
        }
      },
      views: [{
        showGridLines: false,
        zoomScale: 90
      }],
      pageSetup: {
        paperSize: 9,
        orientation: "portrait",
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 1,
        printArea: "A1:Y35",
        margins: {
          left: .3,
          right: .3,
          top: .3,
          bottom: .3,
          header: .12,
          footer: .12
        }
      },
      headerFooter: {
        oddFooter: "&LACERVO&C" + shortDate(emitted) + "&RPágina &P de &N"
      },
    });
    summary.columns = Array.from({
      length: 25
    }, (_, i) => ({
      width: i === 0 || i === 24 ? 2 : 3.8
    }));
    for (let r = 1; r <= 35; r++) summary.getRow(r).height = 18;
    paint(summary, 1, 35, 1, 25, color.white);
    summary.getRow(1).height = 8;
    summary.getRow(2).height = 28;
    text(summary, logoId === null ? "B2:L2" : "D2:L2", "ACERVO", {
      size: 12,
      bold: true,
      fg: color.green
    });
    addLogo(summary, 2, 1, 0, 0);
    text(summary, "N2:X2", "Prefeitura de Curitiba", {
      size: 9,
      fg: color.muted,
      align: "right"
    });
    text(summary, "B3:L3", "Bens e materiais", {
      size: 24,
      bold: true,
      fg: color.green
    });
    summary.getRow(3).height = 34;
    text(summary, "N3:X3", issued + " · Curitiba", {
      size: 9,
      fg: color.muted,
      align: "right"
    });
    text(summary, "B4:X4", scope, {
      size: 9,
      fg: color.muted,
      border: {
        bottom: {
          style: "thin",
          color: {
            argb: color.line
          }
        }
      }
    });
    summary.getRow(4).height = Math.max(24, wrap(scope, 760).length * 12 + 8);
    summary.getRow(5).height = 9;
    const end = Math.max(8, list.length + 7);
    const ref = col => "'Inventário'!$" + col + "$8:$" + col + "$" + end;
    const formula = (value, result) => ({
      formula: value,
      result
    });
    const statusName = s => STATUS[s] || s;
    const count = (...criteria) => "COUNTIFS(" + criteria.map(([col, value]) => ref(col) + ',"' + String(value).replaceAll('"', '""') + '"').join(',') + ")";
    const individuals = list.filter(r => r.controle !== "QUANTIDADE");
    const stocks = list.filter(r => r.controle === "QUANTIDADE");
    const liveStocks = stocks.filter(r => r.situacao === "ATIVO");
    const stockEnd = Math.max(8, stocks.length + 7);
    const healthCount = label => 'COUNTIFS(\'Estoque\'!$H$8:$H$' + stockEnd + ',"' + label + '")';
    const lowStocks = liveStocks.filter(r => Number(r.saldo) <= Number(r.minimo));
    const cards = [
      ["B", "F", "Bens em uso", count(["M", "Individual"], ["H", statusName("ATIVO")]), individuals.filter(r => r.situacao === "ATIVO").length, "Controle individual", color.green, color.white],
      ["H", "L", "Materiais para repor", healthCount("Repor") + "+" + healthCount("Sem saldo"), lowStocks.length, "Saldo no mínimo ou abaixo", color.soft, color.green],
      ["N", "R", "Empréstimos", count(["H", statusName("EMPRESTADO")]), list.filter(r => r.situacao === "EMPRESTADO").length, "Consulte responsáveis na aba", color.soft, color.green],
      ["T", "X", "Descartados", count(["H", statusName("BAIXADO")]), list.filter(r => r.situacao === "BAIXADO").length, "Histórico preservado", color.soft, color.green],
    ];
    cards.forEach(([a, b, label, f, n, note, bg, fg]) => {
      paint(summary, 6, 10, summary.getColumn(a).number, summary.getColumn(b).number, bg);
      text(summary, a + "6:" + b + "6", label, {
        size: 10,
        bold: true,
        fg,
        bg,
        indent: 1
      });
      const value = text(summary, a + "7:" + b + "8", formula(f, n), {
        size: 30,
        fg,
        bg,
        indent: 1
      }); value.numFmt = "#,##0";
      text(summary, a + "9:" + b + "10", note, {
        size: 9,
        fg,
        bg,
        indent: 1
      });
    });
    summary.getRow(6).height = 25;
    summary.getRow(11).height = 12;
    function section(range, title) {
      text(summary, range, title, {
        size: 13,
        bold: true,
        fg: color.green,
        border: {
          bottom: {
            style: "thin",
            color: {
              argb: color.line
            }
          }
        }
      });
    }
    section("B12:L12", "Bens por ambiente");
    text(summary, "B13:L13", "Somente bens individuais em uso", {
      size: 9,
      fg: color.muted
    });
    section("N12:X12", "Situação dos registros");
    text(summary, "N13:X13", "Bens e cadastros de material neste arquivo", {
      size: 9,
      fg: color.muted
    });
    const rule = {
      bottom: {
        style: "hair",
        color: {
          argb: color.line
        }
      }
    };
    function barRow(row, a, label, b, c, f, n, max, barColor) {
      const endLabel = summary.getColumn(summary.getColumn(b).number - 1).letter;
      text(summary, a + row + ":" + endLabel + row, label, {
        size: 10,
        border: rule
      });
      text(summary, b + row + ":" + c + row, formula(f, n), {
        size: 11,
        bold: true,
        align: "right",
        border: rule
      });
      summary.getRow(row).height = 29;
      summary.addConditionalFormatting({
        ref: b + row + ":" + c + row,
        rules: [{
          type: "dataBar",
          cfvo: [{
            type: "num",
            value: 0
          }, {
            type: "num",
            value: Math.max(1, max)
          }],
          color: {
            argb: barColor || "FFB7D8F5"
          },
          showValue: true,
          gradient: false,
        }]
      });
    }
    ROOMS.forEach((room, i) => barRow(14 + i, "B", room, "H", "L",
      count(["M", "Individual"], ["H", statusName("ATIVO")], ["F", room]),
      individuals.filter(r => r.situacao === "ATIVO" && r.dados.ambiente === room).length,
      Math.max(1, ...ROOMS.map(room => individuals.filter(r => r.situacao === "ATIVO" && r.dados.ambiente === room).length))));
    ["ATIVO", "EMPRESTADO", "BAIXADO", "ARQUIVADO"].forEach((s, i) => barRow(14 + i, "N", statusName(s), "U", "X",
      count(["H", statusName(s)]), list.filter(r => r.situacao === s).length, list.length,
      s === "BAIXADO" ? "FFF0BDCA" : "FFB7D8F5"));
    section("B19:L19", "Categorias em uso");
    text(summary, "B20:L20", "Bens individuais ativos por categoria", {
      size: 9,
      fg: color.muted
    });
    CATEGORIES.forEach((cat, i) => barRow(21 + i, "B", cat, "H", "L",
      count(["M", "Individual"], ["H", statusName("ATIVO")], ["C", cat]),
      individuals.filter(r => r.situacao === "ATIVO" && r.dados.categoria === cat).length,
      individuals.filter(r => r.situacao === "ATIVO").length));
    section("N19:X19", "Saúde do estoque");
    text(summary, "N20:X20", "Número de materiais ativos, sem somar unidades diferentes", {
      size: 9,
      fg: color.muted
    });
    summary.getRow(20).height = 29;
    [["Acima do mínimo", liveStocks.filter(r => Number(r.saldo) > Number(r.minimo)).length, "FFB7D8F5"],
      ["Repor", liveStocks.filter(r => Number(r.saldo) > 0 && Number(r.saldo) <= Number(r.minimo)).length, "FFF3D5A2"],
      ["Sem saldo", liveStocks.filter(r => Number(r.saldo) <= 0).length, "FFF0BDCA"]].forEach(([label, n, tone], i) =>
        barRow(21 + i, "N", label, "U", "X", healthCount(label), n, liveStocks.length, tone));
    section("B25:X25", "O que merece atenção");
    const untagged = individuals.filter(r => r.situacao === "ATIVO" && r.dados.tipo === "SEM_IDENTIFICACAO").length;
    text(summary, "B26:R26", "Bens em uso sem etiqueta externa PMC ou ICI", {
      size: 10
    });
    text(summary, "T26:X26", formula(count(["M", "Individual"], ["H", statusName("ATIVO")], ["D", TYPE.SEM_IDENTIFICACAO]), untagged), {
      size: 12,
      bold: true,
      align: "right"
    });
    text(summary, "B27:R27", "Materiais ativos que chegaram ao mínimo ou ficaram sem saldo", {
      size: 10
    });
    text(summary, "T27:X27", formula("H7", lowStocks.length), {
      size: 12,
      bold: true,
      align: "right",
      fg: color.amber
    });
    text(summary, "B28:X28", "Abra Estoque para ver saldos e mínimos; Empréstimos para localizar os responsáveis.", {
      size: 9,
      fg: color.muted
    });
    [26, 27, 28].forEach(r => summary.getRow(r).height = 22);
    [["B30:F31", "Inventário"], ["H30:L31", "Estoque"], ["N30:R31", "Empréstimos"], ["T30:X31", "Relatório A4"]].forEach(([range, name]) =>
      text(summary, range, {
        text: name,
        hyperlink: "#'" + name + "'!A1"
      }, {
        size: 10,
        bold: true,
        fg: color.green,
        bg: color.soft,
        align: "center"
      }));
    text(summary, "B33:X33", formula((list.length ? 'COUNTA(' + ref("A") + ')' : '0') + '&" registros neste arquivo"', list.length + " registros neste arquivo"), {
      size: 9,
      fg: color.muted
    });
    text(summary, "B34:X35", "Dados da emissão. Os indicadores usam as abas deste arquivo; novas movimentações do Acervo exigem outra exportação.", {
      size: 9,
      fg: color.muted
    });
    const widths = [18, 35, 18, 26, 19, 26, 15, 17, 48, 25, 24, 30, 20, 12, 16, 12];
    table("Inventário", "ACERVO_Inventario", inventoryHeaders, list.map(inventoryRow), widths, {
      details: true,
      dates: [10]
    });
    table("Sem identificação externa", "ACERVO_SemIdentificacao", inventoryHeaders,
      list.filter((r) => r.dados.tipo === "SEM_IDENTIFICACAO").map(inventoryRow), widths,
      {
        details: true,
        dates: [10],
        tabColor: "FF92B7D6"
      });
    table("Descartados", "ACERVO_Baixas", [
      "Código interno", "Item", "Identificação", "Data do descarte", "Motivo",
      "Documento/processo", "Responsável", "Ambiente anterior",
    ], list.filter((r) => r.situacao === "BAIXADO").map((r) => [
      internal(r.id), r.dados.item, String(r.dados.codigo || internal(r.id)), r.baixa?.data ? excelDate(r.baixa.data.length === 10 ? r.baixa.data + "T12:00:00-03:00" : r.baixa.data) : null,
      r.baixa?.motivo || "", r.baixa?.documento || "", r.baixa?.email || "", r.baixa?.ambiente || "",
    ]), [18, 35, 24, 23, 45, 28, 32, 26], {
      dates: [4],
      dateOnly: true,
      tabColor: "FFB65871"
    });
    const stockSheet = table("Estoque", "ACERVO_Estoque", [
      "Código interno", "Material", "Ambiente", "Posição", "Saldo", "Unidade", "Mínimo", "Reposição", "Situação", "Categoria", "Observação",
    ], stocks.map((r, i) => {
      const row = i + 8,
        label = r.situacao !== "ATIVO" ? "Fora de uso" : Number(r.saldo) <= 0 ? "Sem saldo" : Number(r.saldo) <= Number(r.minimo) ? "Repor" : "Acima do mínimo";
      return [internal(r.id), r.dados.item, r.dados.ambiente, locationText(r), Number(r.saldo), r.unidade, Number(r.minimo),
        formula('IF(I' + row + '<>"' + STATUS.ATIVO + '","Fora de uso",IF(E' + row + '<=0,"Sem saldo",IF(E' + row + '<=G' + row + ',"Repor","Acima do mínimo")))', label),
        STATUS[r.situacao], r.dados.categoria, r.dados.observacao || ""];
    }), [18, 30, 23, 14, 10, 14, 10, 23, 18, 18, 44], {
      tabColor: "FF398DC8",
      printCols: 9
    });
    if (stocks.length)[["Sem saldo", "FFFCE9EF", "FFA32143"], ["Repor", "FFFFF3DE", "FF875212"]].forEach(([label, bg, fg]) => {
      stockSheet.addConditionalFormatting({
        ref: "H8:H" + (stocks.length + 7),
        rules: [{
          type: "containsText",
          operator: "containsText",
          text: label,
          style: {
            fill: fill(bg),
            font: {
              bold: true,
              color: {
                argb: fg
              }
            }
          }
        }]
      });
    });
    table("Empréstimos", "ACERVO_Emprestimos", [
      "Código interno", "Item", "Etiqueta", "Responsável", "Local atual",
      "Emprestado em (Curitiba)", "Ambiente de origem",
    ], list.filter((r) => r.situacao === "EMPRESTADO").map((r) => [
      internal(r.id), r.dados.item, String(r.dados.codigo || ""), r.emprestimo?.responsavel || "",
      r.emprestimo?.destino || "", excelDate(r.emprestimo?.momento), r.dados.ambiente,
    ]), [18, 35, 23, 32, 32, 28, 28], {
      dates: [6]
    });
    const report = wb.addWorksheet("Relatório A4", {
      properties: {
        tabColor: {
          argb: "FF82B7E5"
        }
      },
      views: [{
        state: "frozen",
        ySplit: 5,
        topLeftCell: "A6",
        showGridLines: false,
        zoomScale: 90
      }],
      pageSetup: {
        paperSize: 9,
        orientation: "landscape",
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 0,
        printTitlesRow: "1:5",
        margins: {
          left: .3,
          right: .3,
          top: .35,
          bottom: .35,
          header: .15,
          footer: .15
        }
      },
      headerFooter: {
        oddFooter: "&LACERVO&C" + shortDate(emitted) + "&RPágina &P de &N"
      },
    });
    const reportWidths = [17, 30, 23, 29, 48];
    report.columns = reportWidths.map(width => ({
      width
    }));
    brand(report, 1, 5);
    text(report, "A3:E3", "Relação de bens e materiais", {
      size: 20,
      bold: true,
      fg: color.green
    });
    report.getRow(3).height = 34;
    text(report, "A4:E4", scope, {
      size: 9,
      fg: color.muted
    });
    report.getRow(4).height = Math.max(24, wrap(scope, 1000).length * 12 + 8);
    report.getRow(5).values = ["Código interno", "Item", "Identificação", "Localização", "Situação e observação"];
    report.getRow(5).height = 29;
    report.getRow(5).eachCell(cell => {
      cell.fill = fill(color.green); cell.font = {
        name: "Arial",
        size: 10,
        bold: true,
        color: {
          argb: color.white
        }
      };
      cell.alignment = {
        vertical: "middle",
        wrapText: true,
        indent: 1
      };
    });
    const ordered = [...list].sort((a, b) => (a.dados.ambiente || "").localeCompare(b.dados.ambiente || "", "pt-BR") || a.dados.item.localeCompare(b.dados.item, "pt-BR"));
    let nextRow = 6;
    ordered.forEach((r, index) => {
      const stock = r.controle === "QUANTIDADE";
      const label = stock ? "Por quantidade" : r.dados.tipo === "SEM_IDENTIFICACAO" ? "Sem etiqueta externa" : (TYPE[r.dados.tipo] || r.dados.tipo) + " " + String(r.dados.codigo || "");
      const where = [r.dados.ambiente, locationText(r)].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join("\n");
      const info = [STATUS[r.situacao] || r.situacao,
        stock ? "Saldo: " + Number(r.saldo) + " " + (r.unidade || "unidades") + " · Mínimo: " + Number(r.minimo) : "",
        r.situacao === "BAIXADO" && r.baixa?.motivo ? "Descarte: " + r.baixa.motivo : "", r.dados.observacao || ""].filter(Boolean).join("\n");
      const values = [internal(r.id), r.dados.item, label, where, info];
      const lines = values.map((v, i) => wrap(v, reportWidths[i] * 7 - 18));
      const longest = Math.max(...lines.map(v => v.length));
      for (let offset = 0; offset < longest; offset += 12) {
        const part = lines.map((v, j) => j === 0 ? values[0] : offset >= v.length ? (j === 1 ? "Continuação" : "") : v.slice(offset, offset + 12).join("\n"));
        const row = report.getRow(nextRow++); row.values = part;
        row.height = Math.max(36, ...part.map((v, j) => wrap(v, reportWidths[j] * 7 - 18).length * 14 + 10));
        row.eachCell(cell => {
          cell.font = {
            name: "Arial",
            size: 11,
            color: {
              argb: color.ink
            }
          }; cell.numFmt = "@";
          cell.fill = fill(index % 2 ? color.soft : color.white);
          cell.alignment = {
            vertical: "middle",
            wrapText: true,
            indent: 1
          };
          cell.border = {
            bottom: {
              style: "hair",
              color: {
                argb: color.line
              }
            }
          };
        });
      }
    });
    if (!list.length) {
      text(report, "A6:E6", "Nenhum registro neste recorte.", {
        fg: color.muted
      });
      report.getRow(6).height = 34;
      nextRow = 7;
    }
    report.pageSetup.printArea = "A1:E" + (nextRow - 1);
    ["Resumo", "Inventário", "Estoque", "Empréstimos", "Descartados", "Sem identificação externa", "Relatório A4"].forEach((name, index) => {
      wb.getWorksheet(name).orderNo = index;
    });
    const buffer = await wb.xlsx.writeBuffer();
    const url = URL.createObjectURL(new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "ACERVO_" + (all ? "completo" : "filtrado") + "_" + dayKey(emitted) + ".xlsx";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    toast("Excel gerado com " + list.length + " registros.");
  } catch (e) {
    toast(e.message, true);
  } finally {
    setAcervoSync(false, undefined, false, exportVisual);
    setBusy(false);
  }
}

function warmBarcode() {
  if (barcodeWorker) return;
  try {
    const source = `
      importScripts(
        'https://cdn.jsdelivr.net/npm/zxing-wasm@3.1.4/dist/iife/reader/index.js'
      );

      const ready=ZXingWASM.prepareZXingModule({
        overrides:{
          locateFile:(p)=>
            'https://cdn.jsdelivr.net/npm/zxing-wasm@3.1.4/dist/reader/'+p
        },
        fireImmediately:true
      });

      ready.catch(()=>{});

      onmessage=async e=>{
        try{
          await ready;

          const results=await ZXingWASM.readBarcodes(
            new ImageData(
              new Uint8ClampedArray(e.data.buffer),
              e.data.width,
              e.data.height
            ),
            {
              formats:['AllReadable'],
              tryHarder:true,
              tryRotate:true,
              tryInvert:true,
              maxNumberOfSymbols:4,
              minLineCount:1
            }
          );

          postMessage({
            results:results
              .filter(r=>!r.error)
              .map(r=>({
                text:r.text,
                format:r.format
              }))
          });
        }catch(err){
          postMessage({error:err.message});
        }
      };
    `;
    const url = URL.createObjectURL(
      new Blob([source], {
        type: "text/javascript"
      }),
    );
    barcodeWorker = new Worker(url);
    URL.revokeObjectURL(url);
    barcodeWorker.onmessage = (e) => {
      if (barcodeTask) {
        clearTimeout(barcodeTask.timer);
        if (e.data.error) {
          barcodeTask.reject(Error(e.data.error));
        } else {
          barcodeTask.resolve(e.data.results);
        }
        barcodeTask = null;
      }
    };
    barcodeWorker.onerror = () => {
      if (barcodeTask) {
        clearTimeout(barcodeTask.timer);
        barcodeTask.reject(Error("Leitor de barras indisponível"));
        barcodeTask = null;
      }
      barcodeWorker?.terminate();
      barcodeWorker = null;
    };
  } catch (e) {
    console.warn(e);
  }
}

function decode(image) {
  return new Promise((resolve, reject) => {
    warmBarcode();
    if (!barcodeWorker) {
      return reject(Error("Leitor indisponível"));
    }
    const timer = setTimeout(() => {
      barcodeWorker?.terminate();
      barcodeWorker = null;
      barcodeTask = null;
      reject(Error("Leitor demorou a responder"));
    }, 20000);
    barcodeTask = {
      resolve,
      reject,
      timer
    };
    barcodeWorker.postMessage(
      {
        buffer: image.data.buffer,
        width: image.width,
        height: image.height,
      },
      [image.data.buffer],
    );
  });
}

function warmOCR() {
  if (!ocrPromise) {
    ocrPromise = (async() => {
      if (!window.Tesseract) throw Error("OCR não carregou");
      const w = await Tesseract.createWorker("eng", 1);
      await w.setParameters({
        tessedit_pageseg_mode: "7",
        tessedit_char_whitelist: "0123456789 ",
        preserve_interword_spaces: "1",
      });
      return w;
    })().catch((e) => {
      ocrPromise = null;
      return null;
    });
  }
  return ocrPromise;
}

function crop(guide, contrast = false, angle = 0) {
  const v = $("video");
  const vr = v.getBoundingClientRect();
  const r = $(guide).getBoundingClientRect();
  if (!v.videoWidth || !vr.width) return null;
  const scale = Math.max(
    vr.width / v.videoWidth,
    vr.height / v.videoHeight,
  );
  const ox = (vr.width - v.videoWidth * scale) / 2;
  const oy = (vr.height - v.videoHeight * scale) / 2;
  const x = Math.max(0, (r.left - vr.left - ox) / scale);
  const y = Math.max(0, (r.top - vr.top - oy) / scale);
  const w = Math.min(v.videoWidth - x, r.width / scale);
  const h = Math.min(v.videoHeight - y, r.height / scale);
  const c = document.createElement("canvas");
  const factor = Math.min(1.5, 1400 / w);
  c.width = Math.round(w * factor);
  c.height = Math.round(h * factor);
  const ctx = c.getContext("2d", {
    willReadFrequently: true
  });
  ctx.drawImage(v, x, y, w, h, 0, 0, c.width, c.height);
  const img = ctx.getImageData(0, 0, c.width, c.height);
  if (contrast) {
    for (let i = 0; i < img.data.length; i += 4) {
      let g =
        (img.data[i] * 0.299 +
          img.data[i + 1] * 0.587 +
          img.data[i + 2] * 0.114 -
          128) *
        1.5 +
        128;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = g;
    }
    ctx.putImageData(img, 0, 0);
  }
  if (angle) {
    const rotated = document.createElement("canvas");
    const a = (angle * Math.PI) / 180;
    rotated.width = Math.ceil(
      Math.abs(c.width * Math.cos(a)) + Math.abs(c.height * Math.sin(a)),
    );
    rotated.height = Math.ceil(
      Math.abs(c.height * Math.cos(a)) + Math.abs(c.width * Math.sin(a)),
    );
    const rc = rotated.getContext("2d");
    rc.fillStyle = "white";
    rc.fillRect(0, 0, rotated.width, rotated.height);
    rc.translate(rotated.width / 2, rotated.height / 2);
    rc.rotate(a);
    rc.drawImage(c, -c.width / 2, -c.height / 2);
    return {
      canvas: rotated,
      image: rc.getImageData(0, 0, rotated.width, rotated.height),
    };
  }
  return {
    canvas: c,
    image: img
  };
}

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

function showCandidates(s) {
  if (scene !== s) return;
  $("candidates").replaceChildren();
  for (const [value, entry] of[...s.candidates.entries()].slice(-4)) {
    if (validScanValue(value)) {
      $("candidates").append(
        button("Usar " + value + " · " + entry.source, () =>
          acceptCode(s, value),
        ),
      );
    } else {
      const p = el("p");
      p.textContent =
        entry.source +
        ": " +
        value.slice(0, 300) +
        " — conteúdo diferente dos seis números esperados. Não foi preenchido.";
      $("candidates").append(p);
    }
  }
}

function candidate(s, text, source, automatic) {
  if (scene !== s) return;
  const value = String(text || "").trim();
  if (!value || value.length > 4096) return;
  const now = performance.now();
  const old = s.candidates.get(value);
  const count = old && now - old.time < 2000 ? old.count + 1 : 1;
  s.candidates.set(value, {
    source,
    count,
    time: now,
  });
  for (const [v, e] of s.candidates) {
    if (now - e.time > 4000) s.candidates.delete(v);
  }
  showCandidates(s);
  if (
    automatic &&
    validScanValue(value) &&
    count >= 2 &&
    s.candidates.size === 1
  ) {
    acceptCode(s, value);
  }
}

function acceptCode(s, value) {
  if (scene !== s) return;
  $(scanTarget).value = value;
  closeScanner();
  if (scanTarget === "moveSearch") {
    renderMovementResults();
    return;
  }
  if (scanTarget === "code") saveDraft();
  duplicateHint();
  toast("Código " + value + " preenchido.");
}

async function barcodeLoop(s) {
  let n = 0;
  let errors = 0;
  while (scene === s) {
    if (barcodeBusy) {
      await pause(150);
      continue;
    }
    barcodeBusy = true;
    try {
      n++;
      const frame = crop(
        "barcodeGuide",
        n % 5 === 0,
        n % 4 === 2 ? 8 : n % 4 === 3 ? -8 : 0,
      );
      if (frame) {
        const results = await decode(frame.image);
        if (scene !== s) break;
        errors = 0;
        for (const r of results) {
          candidate(s, r.text, r.format, true);
        }
      }
    } catch (e) {
      if (scene === s) {
        $("cameraStatus").textContent =
          "Barras: " + e.message + ". OCR continua disponível.";
      }
      if (++errors >= 3) break;
    } finally {
      barcodeBusy = false;
    }
    await pause(130);
  }
}

async function ocrLoop(s) {
  let n = 0;
  while (scene === s) {
    if (ocrBusy) {
      await pause(250);
      continue;
    }
    ocrBusy = true;
    try {
      const w = await warmOCR();
      if (scene !== s) break;
      if (!w) {
        $("cameraStatus").textContent =
          "OCR indisponível; a leitura de códigos continua.";
        break;
      }
      const frame = crop("numberGuide", ++n % 2 === 0);
      if (frame) {
        const {
          data
        } = await w.recognize(frame.canvas);
        if (scene !== s) break;
        if (data.confidence >= 65) {
          for (const line of data.text.split(/[\r\n]+/)) {
            const value = line.replace(/\s/g, "");
            if (/^\d{6}$/.test(value)) {
              candidate(s, value, "OCR · confirme", false);
            }
          }
        }
      }
    } catch (e) {
      if (scene === s) {
        $("cameraStatus").textContent =
          "OCR falhou; leitura de códigos continua.";
      }
      break;
    } finally {
      ocrBusy = false;
    }
    await pause(400);
  }
}

function mobileCamera() {
  const ua = navigator.userAgent || "";
  return/Android|iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

async function openScanner(target = "code") {
  if (!mobileCamera()) return;
  if (
    scene ||
    busy ||
    pending ||
    (target !== "moveSearch" &&
      value(target === "editCode" ? "editType" : "type") ===
      "SEM_IDENTIFICACAO")
  )
  return;
  const s = {
    candidates: new Map(),
    stream: null,
    torch: false,
  };
  scanTarget = target;
  scene = s;
  $("cameraTitle").textContent =
    target === "moveSearch"
    ? "Buscar item para movimentar"
    : "Ler " + TYPE[value(target === "editCode" ? "editType" : "type")];
  $("cameraStatus").textContent = "Procurando códigos…";
  $("candidates").replaceChildren();
  $("torch").disabled = true;
  $("torch").setAttribute("aria-pressed", "false");
  $("zoomLabel").hidden = true;
  $("camera").showModal();
  warmBarcode();
  warmOCR();
  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw Error("Abra o site HTTPS no Safari ou Chrome.");
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: {
          ideal: "environment"
        },
        width: {
          ideal: 1920
        },
        height: {
          ideal: 1080
        },
      },
    });
    if (scene !== s) {
      stream.getTracks().forEach((t) => t.stop());
      return;
    }
    s.stream = stream;
    s.track = stream.getVideoTracks()[0];
    $("video").srcObject = stream;
    await $("video").play();
    if (scene !== s) return;
    const caps = s.track.getCapabilities?.() || {};
    $("torch").disabled = !caps.torch;
    if (caps.zoom && caps.zoom.max > caps.zoom.min) {
      $("zoomLabel").hidden = false;
      const min = caps.zoom.min,
        max = caps.zoom.max,
        step = caps.zoom.step || 0.1;
      $("zoom").min = min;
      $("zoom").max = max;
      $("zoom").step = step;
      const middle = Math.min(
        max,
        Math.max(min, min + Math.round((max - min) / 2 / step) * step),
      );
      try {
        await cameraSettings(s, {
          zoom: middle
        });
      } catch {}
      if (scene !== s) return;
      $("zoom").value = s.track.getSettings().zoom ?? min;
      zoomLabel();
    }
    if (caps.focusMode?.includes("continuous")) {
      try {
        await cameraSettings(s, {
          focusMode: "continuous"
        });
      } catch {}
    }
    if (scene === s) {
      barcodeLoop(s);
      ocrLoop(s);
    }
  } catch (e) {
    if (scene === s) {
      closeScanner();
      toast("Câmera: " + e.message, true);
    }
  }
}

function closeScanner() {
  const s = scene;
  scene = null;
  s?.stream?.getTracks().forEach((t) => t.stop());
  $("video").pause();
  $("video").srcObject = null;
  if ($("camera").open) $("camera").close();
}

function zoomLabel() {
  const min = Number($("zoom").min),
    max = Number($("zoom").max),
    v = Number($("zoom").value);
  $("zoomValue").textContent =
    (max > min ? Math.round(((v - min) / (max - min)) * 100) : 0) + "%";
}

$("scan").onclick = () => openScanner("code");
$("closeCamera").onclick = closeScanner;
$("camera").addEventListener("cancel", (e) => {
  e.preventDefault();
  closeScanner();
});
$("torch").onclick = async() => {
  const s = scene;
  if (!s?.track) return;
  $("torch").disabled = true;
  try {
    await cameraSettings(s, {
      torch: !s.torch
    });
    if (scene === s) {
      s.torch = !s.torch;
      $("torch").setAttribute("aria-pressed", String(s.torch));
      $("torch").setAttribute(
        "aria-label",
        s.torch ? "Desligar lanterna" : "Ligar lanterna",
      );
    }
  } catch {
    if (scene === s)
    $("cameraStatus").textContent =
      "Lanterna indisponível nesta câmera.";
  } finally {
    if (scene === s) $("torch").disabled = false;
  }
};
$("zoom").oninput = zoomLabel;
$("zoom").onchange = async() => {
  const s = scene;
  if (!s?.track) return;
  try {
    await cameraSettings(s, {
      zoom: Number($("zoom").value)
    });
  } catch {
    if (scene === s)
    $("cameraStatus").textContent =
      "Não foi possível aplicar esse zoom.";
  } finally {
    if (scene === s) {
      $("zoom").value = s.track.getSettings().zoom ?? $("zoom").value;
      zoomLabel();
    }
  }
};

async function cameraSettings(s, change) {
  const current = s.track.getSettings(),
    options = {};
  for (const key of["zoom", "torch", "focusMode"])
  if (current[key] !== undefined) options[key] = current[key];
  await s.track.applyConstraints({
    advanced: [{
      ...options,
      ...change
    }],
  });
}

initForm();

function initVisualExperience() {
  const opening = el("div");
  opening.id = "acervoOpening";
  opening.hidden = true;
  $("app").querySelector(".nav").after(opening);
  document.addEventListener("input", event => {
    if (event.target.matches("input,textarea")) syncFieldIdentity();
  });
  document.addEventListener("change", () => syncFieldIdentity());
  syncFieldIdentity();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const tip = $("contextTip");
  let activeHelp = null;
  function closeTip() {
    if (activeHelp) activeHelp.removeAttribute("aria-describedby");
    activeHelp = null;
    tip.hidden = true;
  }
  function positionTip(target) {
    const r = target.getBoundingClientRect(),
      t = tip.getBoundingClientRect();
    tip.style.left =
      Math.max(12, Math.min(innerWidth - t.width - 12, r.left)) + "px";
    tip.style.top =
      Math.max(
        12,
        r.bottom + t.height + 12 > innerHeight
        ? r.top - t.height - 8
        : r.bottom + 8,
      ) + "px";
  }
  function openTip(target) {
    closeTip();
    activeHelp = target;
    tip.textContent = target.dataset.help;
    tip.hidden = false;
    target.setAttribute("aria-describedby", "contextTip");
    positionTip(target);
  }
  function moveTip() {
    if (!activeHelp) return;
    const r = activeHelp.getBoundingClientRect();
    if (activeHelp === document.activeElement &&
      r.bottom > 0 && r.top < innerHeight &&
      r.right > 0 && r.left < innerWidth)
    positionTip(activeHelp);
    else closeTip();
  }
  document.addEventListener("pointerover", (e) => {
    const t = e.target.closest("[data-help]");
    if (t && t !== activeHelp && e.pointerType !== "touch") openTip(t);
  });
  document.addEventListener("pointerout", (e) => {
    if (
      activeHelp &&
      !activeHelp.contains(e.relatedTarget) &&
      activeHelp.contains(e.target)
    )
    closeTip();
  });
  document.addEventListener("focusin", (e) => {
    const t = e.target.closest("[data-help]");
    if (t) openTip(t);
    else closeTip();
  });
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-help]");
    if (t) openTip(t);
    else closeTip();
    if (!e.target.closest(".export-menu"))
    document.querySelector(".export-menu")?.removeAttribute("open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeTip();
  });
  addEventListener("scroll", moveTip, {
    passive: true,
    capture: true
  });
  addEventListener("resize", moveTip);
  document.addEventListener(
    "pointermove",
    (e) => {
      if (reduced.matches || e.pointerType !== "mouse") return;
      const b = e.target.closest(".primary");
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--px", e.clientX - r.left + "px");
      b.style.setProperty("--py", e.clientY - r.top + "px");
    },
    {
      passive: true
    },
  );
  document.querySelectorAll("[data-password-target]").forEach(button => {
    button.onclick = () => {
      const field = $(button.dataset.passwordTarget);
      const show = field.type === "password";
      setPasswordVisibility(button, show);
    };
  });
  const footer = document.querySelector(".institution-footer");
  let footerAnimation = null;
  function revealFooter() {
    footerAnimation?.cancel();
    if (reduced.matches || !footer.animate) return;
    footerAnimation = footer.animate([
      {
        opacity: 0,
        transform: "translateY(12px)"
      },
      {
        opacity: 1,
        transform: "translateY(0)"
      }
    ], {
      duration: 500,
      delay: 0,
      easing: "cubic-bezier(.2,.75,.25,1)",
      fill: "backwards"
    });
  }
  function finishIntro() {
    const wasIntro = !!$("brandIntro");
    $("brandIntro")?.remove();
    document.body.classList.remove("intro-active", "intro-reveal", "intro-landed");
    document.body.classList.add("screen-ready");
    if (wasIntro && !footerAnimation) revealFooter();
  }
  let previousAuthScreen = null;
  function syncScreen() {
    const authScreen = !$("login").hidden;
    document.body.classList.toggle("auth-screen", authScreen);
    if (previousAuthScreen !== null && previousAuthScreen !== authScreen && !$("brandIntro")) revealFooter();
    previousAuthScreen = authScreen;
    $("syncTools").hidden = !$("login").hidden;
    requestAnimationFrame(() => updateNavIndicator(false));
    if ($("login").hidden) {
      finishIntro();
      setPasswordVisibility($("togglePassword"), false);
    }
  }
  new MutationObserver(syncScreen).observe($("login"), {
    attributes: true,
    attributeFilter: ["hidden"],
  });
  syncScreen();
  const nav = document.querySelector(".nav");
  if (typeof ResizeObserver !== "undefined") {
    const navObserver = new ResizeObserver(() => updateNavIndicator(false));
    navObserver.observe(nav);
    nav.querySelectorAll("button").forEach((button) => navObserver.observe(button));
  } else {
    addEventListener("resize", () => updateNavIndicator(false));
  }
  const intro = $("brandIntro");
  if (intro) {
    if (reduced.matches) finishIntro();
    else {
      document.body.classList.add("intro-active");
      setTimeout(() => {
        if (!intro.isConnected) return;
        const from = $("introMark").getBoundingClientRect(),
          to = $("loginMark").getBoundingClientRect();
        intro.classList.add("departing");
        document.body.classList.add("intro-reveal");
        revealFooter();
        $("introMark").style.transform =
          "translate(" +
          (to.left + to.width / 2 - from.left - from.width / 2) +
          "px," +
          (to.top + to.height / 2 - from.top - from.height / 2) +
          "px) scale(" +
          to.width / from.width +
          ")";
        setTimeout(() => {
          if (!intro.isConnected) return;
          $("introMark").style.visibility = "hidden";
          document.body.classList.add("intro-landed");
          intro.style.opacity = "0";
          setTimeout(finishIntro, 380);
        }, 850);
      }, 1300);
    }
  }
  reduced.addEventListener("change", () => {
    if (reduced.matches) {
      footerAnimation?.cancel(); finishIntro();
    }
  });
  setHelpHint($("draftInfo"), "Rascunho automático", "draft");
  $("draftInfo").dataset.help =
    "O rascunho fica neste navegador, associado à sua conta. O registro definitivo acontece ao cadastrar.";
  $("draftInfo").tabIndex = 0;
  setHelpHint($("learningHint"), $("learningHint").textContent.trim(), "suggestion");
  if (!$("learningHint").dataset.help)
  $("learningHint").dataset.help =
    "Escolha um nome existente ou cadastre um novo. As sugestões se baseiam no histórico do inventário.";
  $("learningHint").tabIndex = 0;
  document.querySelectorAll(".step-title").forEach((n) => {
    n.textContent = n.textContent.replace(/^0[1-3] \/ /, "");
  });
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries)
      if (e.isIntersecting) {
        if (!reduced.matches) e.target.classList.add("motion-enter");
        observer.unobserve(e.target);
      }
    },
    {
      threshold: 0.08
    },
  );
  document
    .querySelectorAll("#app .card")
    .forEach((n) => observer.observe(n));
  for (const id of["exportFiltered", "exportAll"])
  $(id).addEventListener("click", () =>
    document.querySelector(".export-menu").removeAttribute("open"),
  );
  $("refresh").setAttribute("aria-label", "Atualizar inventário");
  $("refresh").dataset.help = "Atualizar inventário";
}

initVisualExperience();

(async() => {
  if (!db) {
    $("loginMessage").textContent =
      "Biblioteca de conexão indisponível. Atualize a página.";
    return;
  }
  const {
    data,
    error
  } = await db.auth.getSession();
  if (error) $("loginMessage").textContent = error.message;
  else if (data.session) await loginReady(data.session);
})();
