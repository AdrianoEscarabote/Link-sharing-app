import Header from "@/components/Header";
import ProfileContainer from "./components/ProfileContainer";

export const metadata = {
  title: "Profile Details",
};

const ProfileDetailsPage = () => {
  return (
    <div className="wrapper bg-almost_white min-h-screen w-full p-6">
      <Header />
      <main className="mt-6">
        <ProfileContainer />
      </main>
    </div>
  );
};

export default ProfileDetailsPage;
