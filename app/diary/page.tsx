import Card from "@/components/ui/card";




function formatDiaryDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DiaryPage() {
  return (
    <div className="space-y-8 py-8">
    
        <h1 className="text-4xl font-bold text-[#5c3d2e]">
          Diary entries for admin@test.com
        </h1>
        <p className="text-gray-600 text-lg mt-3">
          Review all saved diary entries with title, date, and content.
        </p>
      </div>
  );
}
