import ImageUpload from "../ImageUpload";
import style from "./style.module.css";

const ImageContainer = () => {
  return (
    <section
      className={`${style.container} flex justify-between items-center bg-almost_white dark:bg-dark-bg-1 dark:border dark:border-border p-5 rounded-xl mb-6`}
    >
      <p className="BodyM text-gray pr-4 dark:text-grey-100">Profile picture</p>

      <div className="flex items-center justify-between max-w-[432px]">
        <ImageUpload />
        <p className="max-w-[215px] BodyS text-gray pl-6 dark:text-grey-300">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
    </section>
  );
};

export default ImageContainer;
