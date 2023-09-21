"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Testimonial } from "@/types";
import { useRef } from "react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    enable?: boolean;
    title: string;
    description?: string;
    testimonials: Array<Testimonial>;
  };
}

const Testimonials = ({ data }: { data: PageData }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <>
      {data.frontmatter.enable && (
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-12 rounded-xl bg-primary">
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  pagination={{ clickable: true, enabled: false }}
                  loop={true}
                  loopedSlides={2}
                  centeredSlides={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={24}
                  slidesPerView={1}
                  navigation={{
                    // Both prevEl & nextEl are null at render so this does not work
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  onInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation?.update();
                  }}
                >
                  {data.frontmatter.testimonials.map(
                    (item: Testimonial, index: number) => (
                      <SwiperSlide key={index}>
                        <div className="px-4 md:px-24 py-10 ">
                          <blockquote
                            className="my-8 text-white"
                            dangerouslySetInnerHTML={markdownify(item.content)}
                          />
                          <hr className="opacity-30" />
                          <div className="mt-11 flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="text-dark ">
                                <ImageFallback
                                  height={80}
                                  width={80}
                                  className="rounded-full"
                                  src={item.avatar}
                                  alt={item.name}
                                />
                              </div>
                              <div className="ml-4">
                                <h3
                                  dangerouslySetInnerHTML={markdownify(
                                    item.name,
                                  )}
                                  className="font-primary text-xl font-semibold text-white mb-1"
                                />
                                <p
                                  dangerouslySetInnerHTML={markdownify(
                                    item.designation,
                                  )}
                                  className="text-white  text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <img src={item.logo} alt="" className=" h-20" />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ),
                  )}
                  <div className="flex justify-between px-4 md:px-24 pb-8">
                    <h6 className="text-accent font-primary text-md">
                      WHAT PEOPLE SAID
                    </h6>
                    <div>
                      <a
                        ref={navigationPrevRef}
                        className="btn bg-black rounded-full mr-6"
                      >
                        <svg
                          width="17"
                          height="12"
                          viewBox="0 0 17 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 7.00006L17 7.00006L17 5.00006L16 5.00006L16 7.00006ZM16 5.00006L1.99999 5.00006L1.99999 7.00006L16 7.00006L16 5.00006ZM8.74194 12C8.74194 7.91185 4.57595 5 6.11959e-07 5L4.37114e-07 7C3.97557 7 6.74194 9.46073 6.74194 12L8.74194 12ZM4.37114e-07 7C4.57591 7 8.74212 4.08818 8.74212 -6.34504e-07L6.74212 -8.0935e-07C6.74212 2.53924 3.9756 5 6.11959e-07 5L4.37114e-07 7Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                      <a
                        href="#!"
                        className="btn bg-black rounded-full"
                        ref={navigationNextRef}
                      >
                        <svg
                          width="17"
                          height="12"
                          viewBox="0 0 17 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 4.99994H0V6.99994H1V4.99994ZM1 6.99994H15V4.99994H1V6.99994ZM8.25806 0C8.25806 4.08815 12.4241 7 17 7V5C13.0244 5 10.2581 2.53927 10.2581 0H8.25806ZM17 5C12.4241 5 8.25788 7.91182 8.25788 12H10.2579C10.2579 9.46076 13.0244 7 17 7V5Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Testimonials;
