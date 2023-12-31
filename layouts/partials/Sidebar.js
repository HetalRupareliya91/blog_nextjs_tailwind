import config from "@config/config.json";
import social from "@config/social.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Logo from "@layouts/components/Logo";
import CustomForm from "@layouts/components/NewsLetterForm";
import Social from "@layouts/components/Social";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import MailchimpSubscribe from "react-mailchimp-subscribe";
const { blog_folder } = config.settings;
const { about, featured_posts, newsletter } = config.widgets;

const Sidebar = ({ posts, categories, className }) => {
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );

  const [showRecent, setShowRecent] = useState(true);

  return (
    <aside className={`${className} px-0 lg:px-6 lg:col-4`}>
   
      {/* categories widget */}
      {categories.enable && (
        <div className="mt-6 p-6 ">
          <h4 className="section-title mb-12 text-center">
            {featured_posts.title}
          </h4>
          <ul>
            {categories.map((category, i) => (
              <li
                className={`relative mb-2 flex items-center justify-between pl-6 text-[16px] font-bold capitalize text-dark dark:text-darkmode-light ${
                  i !== categories.length - 1 &&
                  "border-b border-border  dark:border-darkmode-border"
                }`}
                key={i}
              >
                <svg
                  className="absolute left-0 top-2.5"
                  width="20px"
                  height="20px"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7318 9.35984C12.0854 8.93556 12.7159 8.87824 13.1402 9.2318C13.5645 9.58537 13.6218 10.2159 13.2682 10.6402L8.26825 16.6402C7.91468 17.0645 7.28412 17.1218 6.85984 16.7682C6.43556 16.4147 6.37824 15.7841 6.7318 15.3598L11.7318 9.35984Z"
                    fill="#0a208b"
                  />
                  <path
                    d="M6.7318 4.64021C6.37824 4.21593 6.43556 3.58537 6.85984 3.2318C7.28412 2.87824 7.91468 2.93556 8.26825 3.35984L13.2682 9.35984C13.6218 9.78412 13.5645 10.4147 13.1402 10.7682C12.7159 11.1218 12.0854 11.0645 11.7318 10.6402L6.7318 4.64021Z"
                    fill="#0a208b"
                  />
                </svg>
                <Link className="py-2" href={`/categories/${category.name}`}>
                  {category.name.replace("-", " ")}
                  <span className="absolute top-1/2 right-0 -translate-y-1/2 text-[10px] text-gray-500">
                    {category.posts}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* featured widget */}
      {featured_posts.enable && (
        <div className="mt-6 p-6">
          
          <h5 className="section-title mb-6">Featured</h5>
          { featuredPosts
                .slice(0, featured_posts.showPost)
                .map((post, i, arr) => (
                  <div
                    className={`flex items-center pb-6 ${
                      i !== arr.length - 1 &&
                      "mb-4 border-b dark:border-b-darkmode-border"
                    }`}
                    key={`key-${i}`}>
                    
                    <div>
                        <Link
                          href={`/${blog_folder}/${post.slug}`}
                          className="block text-primary"
                        >
                          {post.frontmatter.title}
                        </Link>
                    </div>
                  </div>
                ))
          }
          
          <h5 className="section-title mb-6 mt-10">Older posts</h5>
          { sortPostByDate
                .slice(0, featured_posts.showPost)
                .map((post, i, arr) => (
                  <div
                    className={`flex items-center ${
                      i !== arr.length - 1 &&
                      "mb-4 border-b border-border pb-6 dark:border-darkmode-border"
                    }`}
                    key={`key-${i}`} >
                    <div>
                        <Link
                          href={`/${blog_folder}/${post.slug}`}
                          className="block text-primary"
                        >
                          {post.frontmatter.title}
                        </Link>
                    </div>
                  </div>
                ))
          }
          
        </div>
      )}

    </aside>
  );
};

export default Sidebar;
