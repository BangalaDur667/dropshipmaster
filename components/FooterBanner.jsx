import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    desc,
  },
}) => {
  return (
    <div class="footer-banner-container">
      <div className="banner-desc">
        <div className="left"></div>

        <div className="right">
          <h3>{largeText2}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText} </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
