import { FilterParams } from "@/types/filter-params";

import { type Template } from "../types/templates";

const createFilterQuery = (
  params: FilterParams,
  query: URLSearchParams,
): string => {
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => query.append(key, v.toString()));
    } else {
      query.append(key, value.toString());
    }
  });

  return query.toString();
};

export async function filterTemplates(
  params: FilterParams = {},
): Promise<Template[]> {
  const query = new URLSearchParams(); //ye object khali {} amadeye append kardan

  const queryString = createFilterQuery(params, query);
  const res = await fetch(`/api/templates?${queryString}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch templates: ${res.status}`);
  }

  const data = await res.json();
  return data.templates;
}
