import { z } from 'zod';

export interface Unit {
  id: number;
  unitName: string;
  unitType: string;
  codexPage: number;
  pointsCost: number;
  isBuilt: boolean;
  isPainted: boolean;
}

const RawUnit = z.object({
  id: z.union([z.number(), z.string()]).transform((v) => Number(v)),
  unit_name: z.string().optional(),
  unit_type: z.string().optional(),
  codex_page: z.union([z.number(), z.string()]).optional().transform((v) => (v === undefined ? 0 : Number(v))),
  points_cost: z.union([z.number(), z.string()]).optional().transform((v) => (v === undefined ? 0 : Number(v))),
  is_built: z.union([z.boolean(), z.string(), z.number()]).optional().transform((v) => {
    if (v === undefined) return false;
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v !== 0;
    return v === 'true' || v === '1';
  }),
  is_painted: z.union([z.boolean(), z.string(), z.number()]).optional().transform((v) => {
    if (v === undefined) return false;
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v !== 0;
    return v === 'true' || v === '1';
  }),
});

const RawUnits = z.array(RawUnit);

function toUnit(obj: any): Unit | null {
  if (!obj) return null;
  const id = Number(obj.id ?? obj.ID ?? obj.Id);
  if (!Number.isFinite(id)) return null;
  return {
    id,
    unitName: String(obj.unit_name ?? obj.unitName ?? ''),
    unitType: String(obj.unit_type ?? obj.unitType ?? 'Unknown'),
    codexPage: Number(obj.codex_page ?? obj.codexPage ?? 0),
    pointsCost: Number(obj.points_cost ?? obj.pointsCost ?? 0),
    isBuilt: Boolean(obj.is_built ?? obj.isBuilt ?? false),
    isPainted: Boolean(obj.is_painted ?? obj.isPainted ?? false),
  };
}

/**
 * Parse raw JSON (string) or already-parsed data into `Unit[]`.
 * If input is a string, `JSON.parse` will be used.
 * It validates with `zod` when possible and falls back to best-effort mapping.
 */
export function parseUnits(raw: unknown): Unit[] {
  let arr: any[] = [];
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      arr = Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      return [];
    }
  } else if (Array.isArray(raw)) {
    arr = raw;
  } else if (raw && typeof raw === 'object') {
    arr = [raw as any];
  } else {
    return [];
  }

  // Try zod validation first
  const validated = RawUnits.safeParse(arr);
  const items = validated.success ? validated.data : arr;

  const map = new Map<number, Unit>();
  for (const item of items) {
    // If zod validated, fields like id, codex_page are transformed already
    const u = toUnit(item);
    if (u) map.set(u.id, u);
  }
  return Array.from(map.values());
}

export function sortUnits(units: Unit[]) {
  return units.slice().sort((a, b) => a.unitName.localeCompare(b.unitName) || a.id - b.id);
}

export function groupByType(units: Unit[]) {
  return units.reduce<Record<string, Unit[]>>((acc, u) => {
    (acc[u.unitType] ??= []).push(u);
    return acc;
  }, {});
}
