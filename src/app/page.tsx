import SectionHeading from "@/components/SectionHeading";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Button, Feature, IService } from "@/types";
import { FaCheck } from "react-icons/fa/index.js";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    banner,
    features,
    about,
    clients,
    capabilities,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    clients: {
      sectionheading: string;
      title: string;
      button: Button;
      image_lg: string;
      image_sm: string;
    };
    about: {
      sectionheading: string;
      title: string;
      image: string;
      image_gurantee: string;
      content?: string;
      services: IService[];
    };
    capabilities: {
      sectionheading: string;
      title: string;
      button: Button;
      image: string;
      allinone: string;
      graphic: string;
      content?: string;
      services: IService[];
    };
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <section className="section pt-48 pb-24">
        <div className="container">
          <div className="grid grid-cols-12 justify-center items-center">
            {banner.image && (
              <div className="col-start-1 col-end-12 md:col-start-7 md:col-end-12 md:order-2">
                <ImageFallback
                  src={banner.image}
                  className="mx-auto"
                  width="800"
                  height="420"
                  alt="banner image"
                  priority
                />
              </div>
            )}
            <div className="col-start-1 col-end-12 md:col-span-5 md:order-1">
              <h1
                className="mb-4 uppercase text-7xl"
                dangerouslySetInnerHTML={markdownify(banner.title)}
              />
              <p
                className="mb-8"
                dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
              />
              {banner.button!.enable && (
                <a
                  className="btn btn-primary rounded-full"
                  href={banner.button!.link}
                >
                  {banner.button!.label}
                  <svg
                    width="9"
                    height="8"
                    viewBox="0 0 9 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline ml-2"
                  >
                    <path
                      d="M1 2.99996H0V4.99996H1V2.99996ZM1 4.99996H8V2.99996H1V4.99996ZM4.12903 0C4.12903 2.73026 6.27918 5 8.99999 5V3C7.44506 3 6.12903 1.68801 6.12903 0H4.12903ZM8.99999 3C6.27921 3 4.12894 5.2697 4.12894 8H6.12894C6.12894 6.31201 7.44503 5 8.99999 5V3Z"
                      fill="white"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {about && (
        <section className="pb-24 pt-40" id="about">
          <div className="container">
            <div className="grid grid-cols-12">
              <SectionHeading
                title={about.sectionheading}
                dark={false}
                className="mb-8 text-center"
              />
            </div>

            <div className="grid grid-cols-12 mb-8">
              <div className="lg:col-span-3 md:col-span-6 col-span-12">
                <h2 className="text-5xl uppercase">{about.title}</h2>
              </div>

              <div className="lg:col-span-3 col-span-0 hidden lg:block">
                <img src={about.image} alt="" />
              </div>

              <div className="lg:col-start-8 lg:col-end-12 md:col-span-6 col-start-1 col-end-12 ">
                <img src={about.image_gurantee} alt="" className="mb-8" />
                <p>{about.content}</p>
              </div>
            </div>

            {/* features  */}

            <div className="grid grid-cols-12 gap-8">
              {about.services.map((service, index) => (
                <div
                  className="service md:col-span-4 col-span-12 bg-secondary rounded-xl pl-8 md:pl-4 lg:p-8 py-20 md:pr-16 pr-4 relative overflow-hidden"
                  key={index}
                >
                  <img
                    src="/images/feature-graphic.png"
                    alt=""
                    className="background-graphic absolute top-0 right-0"
                  />
                  <img src={service.icon} alt="bulb" />
                  <h2 className="uppercase text-accent mt-4 mb-4 text-4xl">
                    {service.title}
                  </h2>
                  <p className="text-white">{service.body}</p>
                </div>
              ))}
              <div className="lg:col-span-4"></div>
            </div>
          </div>
        </section>
      )}

      {/* {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
                <ImageFallback
                  src={feature.image}
                  height={480}
                  width={520}
                  alt={feature.title}
                />
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck className={"absolute left-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button.enable && (
                  <a
                    className="btn btn-primary mt-5"
                    href={feature.button.link}
                  >
                    {feature.button.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      ))} */}

      {/* Clients */}
      {clients && (
        <section className="py-24">
          <div className="container">
            <div className="grid grid-cols-12">
              <div className="col-span-12 text-center">
                <SectionHeading
                  title={clients.sectionheading}
                  dark={false}
                  className="mb-8 text-center max-w-sm"
                />
                <div className="col-span-12 lg:col-span-6">
                  <h2 className="lg:text-6xl md:text-5xl mt-16 tracking-wider">
                    {clients.title}
                  </h2>
                </div>
                <div className="col-span-12">
                  <img
                    src={clients.image_lg}
                    className="w-full -mt-16 md:block hidden"
                    alt=""
                  />
                  <img
                    src={clients.image_sm}
                    className="w-full mt-16 block md:hidden"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* capabilities  */}
      {capabilities && (
        <section className="py-24 bg-secondary">
          <div className="container">
            <div className="grid grid-cols-12">
              <div className="col-span-12 mb-8">
                <SectionHeading
                  title={capabilities.sectionheading}
                  dark={true}
                  className="text-center max-w-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 mb-8">
              <div className="lg:col-span-3 md:col-span-5 col-span-12">
                <h2 className="text-7xl uppercase text-white tracking-wide">
                  {capabilities.title}
                </h2>
                {capabilities.button.enable && (
                  <div className=" md:block hidden">
                    <a
                      className="btn bg-accent text-dark mt-5 rounded-full text-sm"
                      href={capabilities.button.link}
                    >
                      {capabilities.button.label}
                      <svg
                        width="9"
                        height="8"
                        viewBox="0 0 9 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline ml-2"
                      >
                        <path
                          d="M1 2.99996H0V4.99996H1V2.99996ZM1 4.99996H8V2.99996H1V4.99996ZM4.12903 0C4.12903 2.73026 6.27918 5 8.99999 5V3C7.44506 3 6.12903 1.68801 6.12903 0H4.12903ZM8.99999 3C6.27921 3 4.12894 5.2697 4.12894 8H6.12894C6.12894 6.31201 7.44503 5 8.99999 5V3Z"
                          fill="black"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              <div className="lg:col-start-7 lg:col-end-11 md:col-start-7 md:col-end-11 col-span-12">
                <p className="text-white md:mb-16 mb-4">
                  {capabilities.content}
                </p>
                {capabilities.button.enable && (
                  <div className=" md:hidden blolck">
                    <a
                      className="btn bg-accent text-dark mt-5 rounded-full text-sm mb-8"
                      href={capabilities.button.link}
                    >
                      {capabilities.button.label}
                      <svg
                        width="9"
                        height="8"
                        viewBox="0 0 9 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline ml-2"
                      >
                        <path
                          d="M1 2.99996H0V4.99996H1V2.99996ZM1 4.99996H8V2.99996H1V4.99996ZM4.12903 0C4.12903 2.73026 6.27918 5 8.99999 5V3C7.44506 3 6.12903 1.68801 6.12903 0H4.12903ZM8.99999 3C6.27921 3 4.12894 5.2697 4.12894 8H6.12894C6.12894 6.31201 7.44503 5 8.99999 5V3Z"
                          fill="black"
                        />
                      </svg>
                    </a>
                  </div>
                )}
                <img src={capabilities.image} alt="" className="mb-8" />
              </div>
            </div>

            <div className="col-12 relative">
              <img
                src={capabilities.allinone}
                alt=""
                className="absolute -right-4 -top-12"
              />
              <hr className="opacity-30 my-32" />
            </div>

            {/* all in one services  */}
            {/* features  */}

            <div className="grid grid-cols-12 gap-8">
              {capabilities.services.map((service, index) => (
                <>
                  {!service.graphic ? (
                    <>
                      <div
                        className="lg:col-span-4 lg:my-8 my-2 col-span-12"
                        key={index}
                      >
                        <div className="flex">
                          <h2 className="mr-8 md:mt-24 text-accent">
                            0{++index}.
                          </h2>
                          <div>
                            <img src={service.icon} alt="bulb" />
                            <h2
                              className="uppercase text-white mt-8 mb-4 text-4xl tracking-wider"
                              dangerouslySetInnerHTML={markdownify(
                                service.title,
                              )}
                            ></h2>
                            <p className="text-white">{service.body}</p>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-2"></div>
                    </>
                  ) : (
                    <div className="lg:col-span-4 mt-8 mb-8 col-span-8">
                      <img src={service.graphic} />
                    </div>
                  )}
                </>
              ))}
              <div className="lg:col-span-4"></div>
            </div>
          </div>
        </section>
      )}

      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
