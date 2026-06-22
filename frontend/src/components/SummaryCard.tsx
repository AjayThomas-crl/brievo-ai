import type { Meeting } from "../types/analysis";

type Props = {
  meeting: Meeting | null;
};
export default function SummaryCard({ meeting }: Props) {
  return (
    <div className="flex-1 mb-20">
      <h2 className="font-medium text-3xl mb-6">Summary</h2>
      <div className="mt-4 flex justify-center ">
        <p className="bg-card border-border border-1  w-full p-5 rounded-3xl ">
          {meeting?.summary }
        </p>
      </div>
    </div>
  );
}
