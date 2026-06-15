import type { Analysis } from "../types/analysis";

type Props = {
  analysis: Analysis | null;
};
export default function SummaryCard({ analysis }: Props) {
  return (
    <div className="flex-1">
      <h2 className="font-medium text-3xl">Summary</h2>
      <div className="mt-4 flex justify-center ">
        <p className="bg-card border-border border-1 min-h-100 w-full p-4 rounded-3xl ">
          {analysis?.summary}
        </p>
      </div>
    </div>
  );
}
