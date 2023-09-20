import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const CallToAction = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section className="bg-secondary">
          <div className="container">
            <div className="px-4 pt-16 dark:bg-darkmode-theme-light xl:p-20 xl:pb-0">
              <div className="row justify-between">
                <div className="col-12 text-center">
                  <h2
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.title,
                    )}
                    className="text-white uppercase text-7xl mb-8 tracking-wider"
                  />
                  {data.frontmatter.button.enable && (
                    <a
                      className="btn bg-accent rounded-full text-sm"
                      href={data.frontmatter.button.link}
                    >
                      {data.frontmatter.button.label}
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
                  )}
                </div>
                <div className="mb-10 md:col-5 lg:col-4 md:order-2 md:mb-0">
                  <ImageFallback
                    className="w-full"
                    src={data.frontmatter.image}
                    width={392}
                    height={390}
                    alt="cta-image"
                  />
                </div>
                <div className="md:col-5 md:order-1 relative">
                  <ImageFallback
                    className="w-full"
                    src={data.frontmatter.image2}
                    width={392}
                    height={390}
                    alt="cta-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
