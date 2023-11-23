import TextMain from "@/components/dashboard/ui/text.main";
import UiUnderConstruction from "@/components/ui/Ui.underConstruction";

export default async function AdminProfilePage() {
  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <TextMain text="Page de profil" />

      <UiUnderConstruction />
    </div>
  );
}
