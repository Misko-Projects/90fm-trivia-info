import { getPointStructure } from "@/lib/content";

export function PointTable() {
  const rows = getPointStructure();

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper shadow-paper">
      <table className="w-full text-sm">
        <thead className="bg-cream font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-mute">
          <tr>
            <th
              scope="col"
              className="border-b border-rule px-4 py-3 text-left"
            >
              Teams answering correctly
            </th>
            <th
              scope="col"
              className="border-b border-rule px-4 py-3 text-right"
            >
              Points each
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {rows.map((row, i) => {
            const next = rows[i + 1];
            const range = next
              ? row.teamsCorrect === next.teamsCorrect - 1
                ? `${row.teamsCorrect}`
                : `${row.teamsCorrect}–${next.teamsCorrect - 1}`
              : `${row.teamsCorrect} or more`;
            return (
              <tr
                key={row.teamsCorrect}
                className="text-ink-soft hover:bg-cream/60"
              >
                <th
                  scope="row"
                  className="px-4 py-2.5 text-left font-mono text-base font-medium text-ink"
                >
                  {range}
                </th>
                <td className="px-4 py-2.5 text-right font-mono text-base text-maroon">
                  {row.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
