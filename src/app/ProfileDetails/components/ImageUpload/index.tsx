"use client";

import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import NextImage from "next/image";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { rootState } from "@/redux/root-reducer-types";
import { setProfileImageUrl } from "@/redux/userProfileData/reducer";
import LoadingComponent from "@/components/LoadingComponent";
import Alert from "@/components/Alert";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const [showLoadingComponent, setShowLoadingComponent] = useState<boolean>();
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const [error, setError] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { profileImageUrl, id } = useSelector(
    (rootReducer: rootState) => rootReducer.profileDataSlice
  );

  useEffect(() => {
    dispatch(setProfileImageUrl({ url: imageUrl as string }));
  }, [imageUrl]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const isValid = await checkImageValidity(file);
      if (isValid) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(
            setProfileImageUrl({
              url: reader.result as string,
            })
          );
        };
        reader.readAsDataURL(file);
        setError(false);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (!selectedImage) return;

    const checkValidity = async () => {
      setShowLoadingComponent(true);

      try {
        const formData = new FormData();
        formData.append("profileImage", selectedImage);

        const response = await fetch(
          `http://localhost:3000/profile/setProfileImageUrl/${id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
        if (response.status === 200) {
          setAlertOpen(true);
        }
        setTimeout(() => {
          setAlertOpen(false);
        }, 3000);
      } catch (error) {
        console.error("Erro durante o upload da imagem: ", error);
      }
      setShowLoadingComponent(false);
    };

    checkValidity();
  }, [selectedImage]);

  const checkImageValidity = async (image: File): Promise<boolean> => {
    const allowedFormats = ["image/jpeg", "image/png"];
    const allowedMaxSize = 1024 * 1024; // 1 MB

    if (!allowedFormats.includes(image.type) || image.size > allowedMaxSize) {
      return false;
    }

    const dimensions = await getImageDimensions(image);
    const maxWidthHeight = 1024;

    if (
      dimensions.width > maxWidthHeight ||
      dimensions.height > maxWidthHeight
    ) {
      return false;
    }
    return true;
  };

  const getImageDimensions = async (
    image: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const img = new Image();
          img.src = event.target.result as string;

          img.onload = () => {
            resolve({ width: img.width, height: img.height });
          };
        }
      };
    });
  };

  return (
    <>
      <div className="relative w-[193px] bg-light_purple h-[193px] rounded-xl">
        {profileImageUrl === null || profileImageUrl === undefined ? (
          <div className="absolute w-[193px] h-[193px] flex items-center justify-center flex-col gap-2 z-30">
            <NextImage
              width={40}
              height={40}
              src="/assets/icon-upload-image.svg"
              alt=""
            />
            <p className="HeadingS text-dark_purple">+ Upload Image</p>
          </div>
        ) : (
          <div
            className={`${error ? `${style.error}` : ""} ${
              style.container_upload_image
            } absolute w-[193px] h-[193px] flex items-center justify-center flex-col gap-2 z-30 rounded-xl`}
          >
            {showLoadingComponent ? (
              <LoadingComponent />
            ) : (
              <>
                <NextImage
                  width={40}
                  height={40}
                  src="/assets/icon-upload-image.svg"
                  className={`${style.image}`}
                  alt=""
                />
                <p className="HeadingS text-white">Change image</p>
              </>
            )}
          </div>
        )}

        {profileImageUrl && (
          <div className="z-20 absolute w-[193px] h-[193px] flex items-center justify-center flex-col gap-2 rounded-xl overflow-hidden">
            <NextImage
              fill
              src={profileImageUrl}
              alt="Pré-visualização"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <label
          htmlFor="file"
          className={"relative inline-block z-50 bg-light_purple"}
        >
          <input
            type="file"
            accept="image/*"
            id="file"
            onChange={handleImageChange}
            className={`absolute bg-red opacity-0 -top-[17px] bottom-0 right-0 left-0 w-[193px] h-[193px] cursor-pointer rounded-xl`}
            placeholder=""
          />
        </label>
      </div>
      {error ? (
        <Alert
          altImage=""
          imgPath="/assets/icon-error.svg"
          show={error}
          text="The image must be below 1024x1024px and in either PNG or JPG format."
        />
      ) : null}
      {alertOpen ? (
        <Alert
          altImage="icon saved"
          imgPath="/assets/icon-changes-saved.svg"
          text="Your changes have been successfully saved!"
          show={alertOpen}
        />
      ) : null}
    </>
  );
};

export default ImageUpload;
