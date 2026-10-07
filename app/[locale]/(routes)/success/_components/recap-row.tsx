export const RecapRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-3 text-sm">
    <dt className="text-[#6B6B6B]">{label}</dt>
    <dd className="m-0 text-[#2E2E2E]">{value}</dd>
  </div>
);
