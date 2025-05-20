import { PlatformsName } from "@/redux/root-reducer-types";

export default function getMockState() {
  return {
    profileDataSlice: {
      email: "adriano@email.com",
      firstName: "adriano",
      lastName: "last name",
      previewEmail: "adrianopreview@email.com",
      profileImageName: "teste.jpg",
      profileImageUrl:
        "https://firebasestorage.googleapis.com/v0/b/link-sharing-app-25cf3.appspot.com/o/WhatsApp%20Image%202023-07-10%20at%2016.46.33.jpeg?alt=media&token=a6378684-8ea4-4b63-a053-744f371b0044",
      id: "12345", // Adicione as propriedades id e uuid aqui
      uuid: "67890",
      links: [
        {
          id: "1",
          link: "https://github.com/Felipesilva",
          platform: "GitHub" as PlatformsName,
        },
        {
          id: "2",
          link: "https://www.frontendmentor.io/AdrianoEscarabote",
          platform: "Frontend Mentor" as PlatformsName,
        },
      ],
    },
    userLinksSlice: {
      links: [
        {
          id: "1",
          link: "https://github.com/Felipesilva",
          platform: "GitHub" as PlatformsName,
        },
        {
          id: "2",
          link: "https://www.frontendmentor.io/AdrianoEscarabote",
          platform: "Frontend Mentor" as PlatformsName,
        },
      ],
    },
  };
}
