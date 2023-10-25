import Image from "next/image"
import { useState } from "react";

const ImageWithFallback = (props) => {
  const {src, ...rest} = props;
  const [imgSrc, setImgSrc] = useState(src);

  const FALLBACK_IMG_SRC = '/images/logo.png'

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(FALLBACK_IMG_SRC)
      }}
    />
  );
}

export default ImageWithFallback;