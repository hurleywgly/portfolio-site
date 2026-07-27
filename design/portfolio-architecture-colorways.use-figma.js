// Figma use_figma script.
// Creates two editable portfolio-homepage colorways plus a function-guess board.
// Run this in a Figma design file with skillNames: "figma-use,figma-generate-design".

const fonts = {
  regular: { family: "Inter", style: "Regular" },
  medium: { family: "Inter", style: "Medium" },
  semibold: { family: "Inter", style: "Semi Bold" },
  bold: { family: "Inter", style: "Bold" },
};

await Promise.all([
  figma.loadFontAsync(fonts.regular),
  figma.loadFontAsync(fonts.medium),
  figma.loadFontAsync(fonts.semibold),
  figma.loadFontAsync(fonts.bold),
]);

const palettes = {
  forest: {
    name: "Colorway A - Forest / Cream / White",
    note: "Original direction: warm cream interface, white panels, light forest green structure.",
    bg: "#3B5631",
    app: "#F2EFD8",
    surface: "#FAF8EA",
    panel: "#E7E5CB",
    panelDark: "#31502F",
    panelMid: "#C8C06E",
    line: "#24412B",
    node: "#D1C85E",
    nodeAlt: "#F8F6E5",
    text: "#223521",
    muted: "#758066",
    grid: "#CBCDAD",
    shadow: "#162317",
    calloutBg: "#F8F6E5",
    calloutText: "#24412B",
  },
  midnight: {
    name: "Colorway B - Midnight / Mustard / Powder Blue",
    note: "Dark mode direction: pastel midnight blue field, navy panes, faded mustard highlights.",
    bg: "#172B45",
    app: "#213B56",
    surface: "#2A4A64",
    panel: "#314F68",
    panelDark: "#13263E",
    panelMid: "#C2A24A",
    line: "#A9C6D5",
    node: "#D4B354",
    nodeAlt: "#C2D8E2",
    text: "#E8EFF2",
    muted: "#9BB5C3",
    grid: "#537187",
    shadow: "#08111D",
    calloutBg: "#D4B354",
    calloutText: "#13263E",
  },
};

const guessRows = [
  {
    id: "01",
    title: "Top navigation",
    guess: "Mode-aware site nav: work, writing, systems, contact. The small pills likely become theme, status, or view controls.",
  },
  {
    id: "02",
    title: "Left technical pane",
    guess: "Profile/workbench controls: selected role, stack filters, current focus area, or a compact command panel.",
  },
  {
    id: "03",
    title: "Floating mini panel",
    guess: "Contextual action strip: launch case study, copy link, open architecture notes, or switch a project view.",
  },
  {
    id: "04",
    title: "Architecture graph",
    guess: "Hero narrative: service graph for how you think, ship, debug, and connect product systems.",
  },
  {
    id: "05",
    title: "Right blueprint/tree pane",
    guess: "Living-system metaphor: growth over a measured grid, perhaps a map of systems, principles, or project lineage.",
  },
  {
    id: "06",
    title: "Bottom artifact cards",
    guess: "Case-study carousel: shipped projects, infrastructure before/after, writing, tools, and operating notes.",
  },
  {
    id: "07",
    title: "Side utility tab",
    guess: "Sticky quick access: contact, availability, resume, theme toggle, or a compact command drawer.",
  },
  {
    id: "08",
    title: "Small metrics/table area",
    guess: "Proof strip: years, systems shipped, domains, favorite tools, current constraints, or build telemetry.",
  },
];

function rgb(hex) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean, 16);
  return {
    r: ((value >> 16) & 255) / 255,
    g: ((value >> 8) & 255) / 255,
    b: (value & 255) / 255,
  };
}

function solid(hex, opacity = 1) {
  return { type: "SOLID", color: rgb(hex), opacity };
}

function shadow(hex, opacity, x, y, blur, spread = 0) {
  return {
    type: "DROP_SHADOW",
    color: { ...rgb(hex), a: opacity },
    offset: { x, y },
    radius: blur,
    spread,
    visible: true,
    blendMode: "NORMAL",
  };
}

const createdNodeIds = [];

function track(node) {
  createdNodeIds.push(node.id);
  return node;
}

function frame(parent, name, x, y, w, h, fill, radius = 0) {
  const node = track(figma.createFrame());
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.clipsContent = false;
  node.fills = fill ? [solid(fill)] : [];
  node.cornerRadius = radius;
  parent.appendChild(node);
  return node;
}

function rect(parent, name, x, y, w, h, fill, radius = 0, opacity = 1) {
  const node = track(figma.createRectangle());
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.cornerRadius = radius;
  node.fills = fill ? [solid(fill, opacity)] : [];
  parent.appendChild(node);
  return node;
}

function ellipse(parent, name, x, y, w, h, fill, stroke, strokeWeight = 0, opacity = 1) {
  const node = track(figma.createEllipse());
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.fills = fill ? [solid(fill, opacity)] : [];
  node.strokes = stroke ? [solid(stroke)] : [];
  node.strokeWeight = stroke ? strokeWeight : 0;
  parent.appendChild(node);
  return node;
}

function segment(parent, name, x1, y1, x2, y2, color, thickness = 3, opacity = 1) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const node = rect(parent, name, x1, y1, len, thickness, color, thickness / 2, opacity);
  node.rotation = Math.atan2(dy, dx) * 180 / Math.PI;
  return node;
}

function hRule(parent, name, x, y, w, color, opacity = 1, thickness = 1) {
  return rect(parent, name, x, y, w, thickness, color, thickness / 2, opacity);
}

function vRule(parent, name, x, y, h, color, opacity = 1, thickness = 1) {
  return rect(parent, name, x, y, thickness, h, color, thickness / 2, opacity);
}

function text(parent, name, chars, x, y, w, opts = {}) {
  const node = track(figma.createText());
  node.name = name;
  node.x = x;
  node.y = y;
  node.fontName = opts.font || fonts.regular;
  node.fontSize = opts.size || 12;
  node.lineHeight = { unit: "PIXELS", value: opts.lineHeight || Math.round((opts.size || 12) * 1.35) };
  node.letterSpacing = { unit: "PIXELS", value: 0 };
  node.fills = [solid(opts.color || "#111111", opts.opacity || 1)];
  node.textAutoResize = "HEIGHT";
  node.resize(w, 12);
  node.characters = chars;
  parent.appendChild(node);
  return node;
}

function outline(parent, name, x, y, w, h, color, radius = 0, opacity = 1, strokeWeight = 1) {
  const node = rect(parent, name, x, y, w, h, null, radius);
  node.fills = [];
  node.strokes = [solid(color, opacity)];
  node.strokeWeight = strokeWeight;
  return node;
}

function callout(parent, id, x, y, p) {
  const dot = ellipse(parent, `Callout ${id} dot`, x, y, 24, 24, p.calloutBg, p.calloutBg, 1);
  dot.effects = [shadow(p.shadow, 0.22, 0, 8, 16)];
  text(parent, `Callout ${id} label`, id, x + 6, y + 5, 18, {
    size: 9,
    font: fonts.bold,
    color: p.calloutText,
    lineHeight: 11,
  });
}

function miniTextLines(parent, x, y, widths, color, opacity = 0.55) {
  widths.forEach((w, i) => {
    rect(parent, `Data line ${i + 1}`, x, y + i * 12, w, 2, color, 1, opacity);
  });
}

function drawGraph(parent, p, x, y) {
  const nodes = [
    { id: "A", x: x + 44, y: y + 95, s: 24, fill: p.nodeAlt, stroke: p.line },
    { id: "B", x: x + 135, y: y + 70, s: 52, fill: p.node, stroke: p.line },
    { id: "C", x: x + 255, y: y + 95, s: 24, fill: p.node, stroke: p.line },
    { id: "D", x: x + 360, y: y + 82, s: 40, fill: p.node, stroke: p.line },
    { id: "E", x: x + 492, y: y + 95, s: 50, fill: p.node, stroke: p.line },
    { id: "F", x: x + 606, y: y + 168, s: 30, fill: p.nodeAlt, stroke: p.line },
    { id: "G", x: x + 322, y: y + 258, s: 32, fill: p.nodeAlt, stroke: p.line },
    { id: "H", x: x + 168, y: y + 236, s: 42, fill: p.node, stroke: p.line },
    { id: "I", x: x + 80, y: y + 296, s: 30, fill: p.nodeAlt, stroke: p.line },
    { id: "J", x: x + 535, y: y + 252, s: 30, fill: p.node, stroke: p.line },
    { id: "K", x: x + 668, y: y + 238, s: 38, fill: p.node, stroke: p.line },
  ];

  const center = (n) => ({ x: n.x + n.s / 2, y: n.y + n.s / 2 });
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  [
    ["A", "B"], ["B", "C"], ["C", "D"], ["D", "E"], ["E", "F"],
    ["B", "H"], ["H", "I"], ["H", "G"], ["D", "G"], ["E", "J"], ["J", "K"],
    ["B", "B2"], ["E", "E2"], ["C", "C2"],
  ].forEach(([a, b], i) => {
    const extra = {
      B2: { x: x + 82, y: y + 20 },
      E2: { x: x + 570, y: y + 30 },
      C2: { x: x + 250, y: y + 20 },
    };
    const p1 = center(byId[a]);
    const p2 = byId[b] ? center(byId[b]) : extra[b];
    segment(parent, `Architecture graph connector ${i + 1}`, p1.x, p1.y, p2.x, p2.y, p.line, 3, 0.92);
  });

  nodes.forEach((n) => {
    const e = ellipse(parent, `Architecture node ${n.id}`, n.x, n.y, n.s, n.s, n.fill, n.stroke, 3);
    e.effects = [shadow(p.shadow, 0.22, 0, 10, 16)];
    ellipse(parent, `Architecture node ${n.id} inner glint`, n.x + n.s * 0.25, n.y + n.s * 0.22, n.s * 0.28, n.s * 0.28, p.surface, null, 0, 0.5);
  });

  [
    { x: x + 82, y: y + 20, s: 26 },
    { x: x + 250, y: y + 20, s: 22 },
    { x: x + 570, y: y + 30, s: 28 },
    { x: x + 620, y: y + 286, s: 16 },
    { x: x + 456, y: y + 270, s: 18 },
    { x: x + 190, y: y + 322, s: 14 },
  ].forEach((n, i) => {
    ellipse(parent, `Open graph endpoint ${i + 1}`, n.x, n.y, n.s, n.s, null, p.line, 3, 0.9);
  });

  miniTextLines(parent, x + 315, y + 42, [78, 48, 62], p.text, 0.28);
  miniTextLines(parent, x + 34, y + 346, [58, 38], p.text, 0.36);
  miniTextLines(parent, x + 395, y + 340, [70, 42], p.text, 0.32);
}

function drawTree(parent, p, x, y) {
  const panel = frame(parent, "Right blueprint tree pane", x, y, 190, 370, p.surface, 7);
  panel.strokes = [solid(p.grid, 0.58)];
  panel.strokeWeight = 1;
  panel.clipsContent = true;

  for (let gx = 0; gx <= 190; gx += 15) {
    vRule(panel, "Blueprint vertical grid", gx, 0, 370, p.grid, gx % 45 === 0 ? 0.34 : 0.18, 1);
  }
  for (let gy = 0; gy <= 370; gy += 15) {
    hRule(panel, "Blueprint horizontal grid", 0, gy, 190, p.grid, gy % 45 === 0 ? 0.34 : 0.18, 1);
  }

  const trunk = p.line;
  segment(panel, "Tree trunk lower", 96, 275, 100, 180, trunk, 5, 0.75);
  segment(panel, "Tree trunk upper", 100, 180, 88, 104, trunk, 4, 0.72);
  segment(panel, "Tree branch left lower", 96, 210, 58, 174, trunk, 3, 0.65);
  segment(panel, "Tree branch left outer", 62, 174, 36, 146, trunk, 2.5, 0.55);
  segment(panel, "Tree branch right lower", 99, 198, 140, 162, trunk, 3, 0.65);
  segment(panel, "Tree branch right outer", 136, 162, 158, 126, trunk, 2.5, 0.55);
  segment(panel, "Tree branch crown left", 88, 132, 58, 94, trunk, 2.2, 0.52);
  segment(panel, "Tree branch crown right", 90, 120, 128, 88, trunk, 2.2, 0.52);

  const leaves = [
    [45, 142, 38], [65, 118, 45], [92, 96, 54], [128, 92, 48], [146, 128, 42],
    [116, 150, 54], [82, 158, 46], [48, 182, 34], [142, 176, 38], [100, 68, 34],
    [128, 64, 30], [66, 82, 30], [112, 210, 32],
  ];
  leaves.forEach(([lx, ly, s], i) => {
    ellipse(panel, `Tree canopy mass ${i + 1}`, lx, ly, s, s * 0.78, p.line, null, 0, i % 3 === 0 ? 0.34 : 0.24);
  });

  for (let i = 0; i < 34; i += 1) {
    const lx = 35 + ((i * 29) % 118);
    const ly = 62 + ((i * 47) % 170);
    const s = 4 + (i % 4);
    ellipse(panel, `Tree leaf detail ${i + 1}`, lx, ly, s, s, p.node, null, 0, 0.5);
  }

  ellipse(panel, "Tree ground wash", 48, 292, 100, 16, p.line, null, 0, 0.17);
  text(panel, "Blueprint pane label", "living system map", 14, 318, 130, {
    size: 8,
    font: fonts.semibold,
    color: p.text,
    lineHeight: 10,
    opacity: 0.58,
  });
  miniTextLines(panel, 14, 338, [58, 44, 72], p.text, 0.24);
}

function drawBottomCards(parent, p, x, y) {
  const widths = [100, 126, 118, 96, 108];
  let cursor = x;
  widths.forEach((w, i) => {
    const card = frame(parent, `Bottom artifact card ${i + 1}`, cursor, y, w, 78, p.surface, 8);
    card.strokes = [solid(p.grid, 0.56)];
    card.strokeWeight = 1;
    text(card, `Artifact label ${i + 1}`, ["Build", "Systems", "Infra", "Tools", "Writing"][i], 10, 10, w - 20, {
      size: 8,
      font: fonts.semibold,
      color: p.text,
      lineHeight: 10,
      opacity: 0.78,
    });
    if (i === 2) {
      rect(card, "Tiny active card strip", 10, 34, w - 20, 28, p.panelMid, 6, 0.35);
    } else {
      miniTextLines(card, 10, 32, [w - 28, w - 46, w - 58], p.text, 0.24);
    }
    cursor += w + 12;
  });
}

function drawLeftPane(parent, p, x, y) {
  const stack = frame(parent, "Left technical control pane", x, y, 180, 300, p.panelDark, 6);
  stack.effects = [shadow(p.shadow, 0.26, 0, 24, 42)];
  text(stack, "Left pane title", "systems", 18, 28, 86, {
    size: 9,
    font: fonts.semibold,
    color: p.nodeAlt,
    lineHeight: 12,
    opacity: 0.85,
  });
  miniTextLines(stack, 18, 55, [74, 62, 48], p.nodeAlt, 0.35);

  for (let i = 0; i < 8; i += 1) {
    const rowY = 98 + i * 23;
    text(stack, `Left pane row number ${i + 1}`, String(i + 1), 22, rowY - 2, 14, {
      size: 8,
      font: fonts.medium,
      color: p.nodeAlt,
      lineHeight: 10,
      opacity: 0.34,
    });
    ellipse(stack, `Left pane status dot ${i + 1}`, 54, rowY, 7, 7, i % 3 === 0 ? p.node : p.nodeAlt, null, 0, 0.78);
    miniTextLines(stack, 82, rowY + 1, [42], p.nodeAlt, 0.25);
  }

  const thin = frame(parent, "Left adjacent data pane", x + 180, y, 78, 300, p.panelMid, 5);
  thin.opacity = 0.72;
  text(thin, "Data pane count", "3", 20, 48, 20, {
    size: 18,
    font: fonts.semibold,
    color: p.text,
    lineHeight: 20,
    opacity: 0.62,
  });
  miniTextLines(thin, 16, 94, [42, 28, 36], p.text, 0.34);
  for (let i = 0; i < 9; i += 1) {
    ellipse(thin, `Data pane mini dot ${i + 1}`, 16 + (i % 3) * 18, 138 + Math.floor(i / 3) * 18, 4, 4, p.text, null, 0, 0.42);
  }

  const float = frame(parent, "Floating contextual action strip", x + 178, y + 174, 90, 48, p.panelDark, 3);
  float.effects = [shadow(p.shadow, 0.24, 0, 16, 24)];
  text(float, "Action strip left", "0", 16, 17, 16, {
    size: 9,
    font: fonts.medium,
    color: p.nodeAlt,
    lineHeight: 10,
    opacity: 0.7,
  });
  text(float, "Action strip right", "01", 58, 17, 18, {
    size: 9,
    font: fonts.medium,
    color: p.nodeAlt,
    lineHeight: 10,
    opacity: 0.7,
  });
}

function drawMockup(parent, p, x, y) {
  const block = frame(parent, p.name, x, y, 1500, 1010, "#F8F7F0", 12);
  block.strokes = [solid("#DFDED0")];
  block.strokeWeight = 1;

  text(block, `${p.name} heading`, p.name, 32, 30, 760, {
    size: 24,
    font: fonts.bold,
    color: "#243124",
    lineHeight: 30,
  });
  text(block, `${p.name} note`, p.note, 32, 65, 980, {
    size: 13,
    font: fonts.regular,
    color: "#5D665C",
    lineHeight: 18,
  });

  const stage = frame(block, "Rounded background stage", 50, 125, 1400, 820, p.bg, 14);
  stage.clipsContent = false;

  const app = frame(stage, "Floating portfolio SPA surface", 210, 158, 980, 575, p.app, 16);
  app.effects = [
    shadow(p.shadow, 0.36, 0, 42, 58),
    shadow(p.shadow, 0.18, -34, 6, 56),
  ];
  app.clipsContent = false;

  text(app, "Vertical signature", "Ryan", 32, 112, 24, {
    size: 11,
    font: fonts.semibold,
    color: p.text,
    lineHeight: 13,
    opacity: 0.62,
  }).rotation = -90;

  ellipse(app, "Tiny brand glyph", 38, 35, 10, 10, null, p.line, 2, 0.72);
  text(app, "Nav item 1", "Engineering", 82, 34, 86, {
    size: 9,
    font: fonts.semibold,
    color: p.text,
    lineHeight: 12,
    opacity: 0.64,
  });
  text(app, "Nav item 2", "Work", 186, 34, 48, {
    size: 9,
    font: fonts.semibold,
    color: p.text,
    lineHeight: 12,
    opacity: 0.64,
  });
  text(app, "Nav item 3", "Systems", 258, 34, 62, {
    size: 9,
    font: fonts.semibold,
    color: p.text,
    lineHeight: 12,
    opacity: 0.78,
  });
  text(app, "Nav item 4", "Notes", 342, 34, 50, {
    size: 9,
    font: fonts.regular,
    color: p.muted,
    lineHeight: 12,
    opacity: 0.45,
  });
  miniTextLines(app, 720, 38, [30, 38], p.text, 0.42);
  outline(app, "Header pill 1", 818, 28, 56, 22, p.grid, 6, 0.72);
  outline(app, "Header pill 2", 900, 28, 40, 22, p.grid, 6, 0.72);

  drawLeftPane(app, p, 112, 86);
  drawGraph(app, p, 355, 106);
  drawTree(app, p, 790, 86);
  drawBottomCards(app, p, 336, 445);

  const proof = frame(app, "Lower proof and metrics table", 112, 395, 230, 122, p.app, 4);
  proof.strokes = [solid(p.grid, 0.54)];
  proof.strokeWeight = 1;
  for (let i = 1; i < 4; i += 1) vRule(proof, "Proof vertical split", i * 55, 0, 122, p.grid, 0.32, 1);
  for (let i = 1; i < 3; i += 1) hRule(proof, "Proof horizontal split", 0, i * 41, 230, p.grid, 0.28, 1);
  text(proof, "Proof metric 1", "25.28", 88, 48, 48, {
    size: 9,
    font: fonts.semibold,
    color: p.text,
    lineHeight: 11,
    opacity: 0.54,
  });
  text(proof, "Proof metric 2", "4ms", 98, 92, 38, {
    size: 9,
    font: fonts.semibold,
    color: p.text,
    lineHeight: 11,
    opacity: 0.54,
  });

  const tab = frame(stage, "Right sticky utility tab", 1192, 325, 44, 104, p.panelMid, 4);
  tab.opacity = p.name.includes("Midnight") ? 0.95 : 0.74;
  for (let i = 0; i < 3; i += 1) {
    ellipse(tab, `Utility tab dot ${i + 1}`, 20, 22 + i * 26, 4, 4, p.line, null, 0, 0.68);
  }

  callout(app, "01", 806, 24, p);
  callout(app, "02", 86, 116, p);
  callout(app, "03", 292, 240, p);
  callout(app, "04", 560, 248, p);
  callout(app, "05", 885, 122, p);
  callout(app, "06", 608, 482, p);
  callout(stage, "07", 1204, 298, p);
  callout(app, "08", 136, 486, p);

  return block;
}

function drawGuessBoard(parent, x, y) {
  const p = palettes.midnight;
  const board = frame(parent, "Function / Utility Guesses", x, y, 820, 1010, "#101B2A", 12);
  board.strokes = [solid("#2A3E56")];
  board.strokeWeight = 1;

  text(board, "Guess board heading", "Function / utility guesses", 34, 32, 540, {
    size: 26,
    font: fonts.bold,
    color: "#F2F0E8",
    lineHeight: 32,
  });
  text(board, "Guess board intro", "These are intentionally provisional labels. They name what each button or pane might do so the next design round can keep, change, or delete the idea.", 34, 72, 690, {
    size: 13,
    font: fonts.regular,
    color: "#B8C6D0",
    lineHeight: 19,
  });

  rect(board, "Palette chip forest", 34, 128, 206, 82, palettes.forest.bg, 8);
  rect(board, "Palette chip cream", 250, 128, 206, 82, palettes.forest.app, 8);
  rect(board, "Palette chip midnight", 466, 128, 126, 82, palettes.midnight.bg, 8);
  rect(board, "Palette chip mustard", 602, 128, 126, 82, palettes.midnight.node, 8);
  text(board, "Palette label", "Two colorway targets: original forest/cream and dark midnight/mustard.", 34, 224, 650, {
    size: 12,
    font: fonts.medium,
    color: "#D9E4EA",
    lineHeight: 16,
  });

  let rowY = 270;
  guessRows.forEach((row) => {
    const card = frame(board, `Guess ${row.id} - ${row.title}`, 34, rowY, 752, 76, "#172B45", 8);
    card.strokes = [solid("#39556D", 0.68)];
    card.strokeWeight = 1;
    ellipse(card, `Guess ${row.id} badge`, 18, 20, 34, 34, palettes.midnight.node, null, 0, 1);
    text(card, `Guess ${row.id} badge text`, row.id, 26, 29, 22, {
      size: 10,
      font: fonts.bold,
      color: "#13263E",
      lineHeight: 12,
    });
    text(card, `Guess ${row.id} title`, row.title, 68, 14, 220, {
      size: 13,
      font: fonts.semibold,
      color: "#F2F0E8",
      lineHeight: 16,
    });
    text(card, `Guess ${row.id} body`, row.guess, 68, 34, 630, {
      size: 11,
      font: fonts.regular,
      color: "#B8C6D0",
      lineHeight: 15,
    });
    rowY += 88;
  });

  text(board, "Next iteration note", "Next pass: decide whether this should feel more like a personal operating console, a project case-study portal, or an architectural systems map.", 34, 952, 712, {
    size: 12,
    font: fonts.medium,
    color: "#D4B354",
    lineHeight: 17,
  });

  return board;
}

let page = figma.root.children.find((candidate) => candidate.name === "Portfolio Architecture Colorways");
if (!page) {
  page = figma.createPage();
  page.name = "Portfolio Architecture Colorways";
}
await figma.setCurrentPageAsync(page);

let maxX = 0;
for (const child of figma.currentPage.children) {
  maxX = Math.max(maxX, child.x + child.width);
}

const wrapper = frame(figma.currentPage, "Portfolio homepage recreation - two colorways plus function guesses", maxX + 120, 120, 4750, 1150, "#ECEAE0", 18);
wrapper.clipsContent = false;
wrapper.effects = [shadow("#111111", 0.08, 0, 20, 60)];

text(wrapper, "Board title", "Ryan portfolio homepage concept", 60, 34, 900, {
  size: 28,
  font: fonts.bold,
  color: "#1F2B25",
  lineHeight: 36,
});
text(wrapper, "Board subtitle", "Editable reconstruction from the Midjourney direction: premium technical portfolio, architecture graph, blueprint tree, and function callouts.", 60, 72, 1180, {
  size: 13,
  font: fonts.regular,
  color: "#647066",
  lineHeight: 19,
});

const forestBlock = drawMockup(wrapper, palettes.forest, 60, 120);
const midnightBlock = drawMockup(wrapper, palettes.midnight, 1600, 120);
const guessesBlock = drawGuessBoard(wrapper, 3140, 120);

figma.viewport.scrollAndZoomIntoView([wrapper]);

return {
  createdNodeIds,
  topLevelNodeIds: {
    wrapper: wrapper.id,
    forestColorway: forestBlock.id,
    midnightColorway: midnightBlock.id,
    functionGuesses: guessesBlock.id,
  },
  notes: [
    "Connector plan lookup failed in Codex, so this script is ready to run in any target Figma design file.",
    "The tree is built from editable ellipses, line segments, and blueprint grid primitives.",
    "Callouts 01-08 map to the Function / Utility Guesses block.",
  ],
};
