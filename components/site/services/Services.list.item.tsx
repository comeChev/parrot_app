import { ServiceWithPicturesAndCategory } from "@/lib/services";
import Image from "next/image";
import noImageAvailable from "@/assets/no-image-available.jpg";
import { BsFillTelephoneFill } from "react-icons/bs";
import UiButtonAction from "@/components/ui/Ui.button.action";

type ServiceListItemProps = {
  service: ServiceWithPicturesAndCategory;
};

const arrayPictures = [0, 1, 2];

export default function ServicesListItem({ service }: ServiceListItemProps) {
  return (
    <div className="mt-[50px] mb-[150px]">
      {/* title */}
      <h4 className="font-bold text-2xl mb-10">{service.service_title}</h4>

      {/* paragraph 1 */}
      <p className="px-2 font-light">{service.service_paragraph_one}</p>

      {/* images */}
      <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-2 my-5 px-2">
        {arrayPictures.map((num) => (
          <Image
            height={300}
            width={300}
            placeholder="blur"
            blurDataURL={"../public/no-image-available.jpg"}
            key={num}
            src={
              service.service_images[num]
                ? (service.service_images[num].service_picture_image as string)
                : noImageAvailable
            }
            alt={
              service.service_images[num]
                ? (service.service_images[num].service_picture_name as string)
                : "service picture"
            }
            className={`${
              num === 0 ? "col-span-2 md:col-auto" : ""
            } object-cover w-full h-full shadow-md rounded-sm shadow-slate-300`}
          />
        ))}
      </div>

      {/* paragraph 2 */}
      <p className="px-2 font-light">{service.service_paragraph_two}</p>

      {/* end sentence */}
      <h5 className="font-semibold text-lg mt-5 px-2">
        {service.service_end_sentence}
      </h5>

      {/* call buttons */}
      <div className="px-2 mt-[50px] mb-5">
        <UiButtonAction
          href="tel:0987654321"
          Icon={BsFillTelephoneFill}
          text="Appelez-nous"
          type="a"
        />
        <UiButtonAction
          href="/contact"
          text="Laissez-nous un message"
          type="link"
        />
      </div>
    </div>
  );
}
