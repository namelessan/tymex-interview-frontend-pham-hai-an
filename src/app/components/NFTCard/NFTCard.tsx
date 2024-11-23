import Image from 'next/image';
import styles from './nftCard.module.scss';
import nftBasketballGirl from '../../../../public/images/nft/basketball_girl.png';
import nftAssassin from '../../../../public/images/nft/assasin.png';
import nftMafiaEngland from '../../../../public/images/nft/mafia_endland.png';
import nftNeonGuy from '../../../../public/images/nft/neon_guy.png';
import nftTheDj from '../../../../public/images/nft/the_dj.png';
import logoEth from '../../../../public/icons/logos_ethereum.svg';
import heart from '../../../../public/icons/heart.svg';
import heartPurple from '../../../../public/icons/heart_purple.svg';
import onlineIcon from '../../../../public/icons/online.svg';
import offlineIcon from '../../../../public/icons/offline.svg';
import { Skeleton } from 'antd';

interface Props {
  product: IProduct;
}

export default function NFTCard(props: Props) {
  const { product } = props;
  const { author } = product;
  const fullName = `${author.firstName} ${author.lastName}`;
  const isOnline = author.onlineStatus === 'idle';

  const nftImages = [
    nftBasketballGirl,
    nftAssassin,
    nftMafiaEngland,
    nftNeonGuy,
    nftTheDj,
  ];

  const images = Array.from(Array(100).keys()).map((id) => {
    const image = nftImages[id % nftImages.length];
    return [id, image];
  });

  const imageIds: Record<IProduct['imageId'], string> = images.reduce(
    (acc, currentId: any) => {
      return { ...acc, [currentId[0]]: currentId[1] };
    },
    {}
  );

  const renderNftImage = (imageId: IProduct['imageId']) => {
    return imageIds[imageId];
  };

  const renderCategoryBackground = (cat: IProduct['category']) => {
    const defaultBackground =
      'linear-gradient(90.13deg, #49DD81 0%, #22B4C6 100%)';

    const categoryBackground: { [key in IProduct['category']]: string } = {
      Epic: 'linear-gradient(90.13deg, #DD5AFE 0%, #6366F1 100%)',
      Legendary: 'linear-gradient(90.13deg, #FE955A 0%, #F1DA63 100%)',
      Mythic: 'linear-gradient(90.13deg, #FE5A5A 0%, #F163D2 100%)',
      Rare: 'linear-gradient(90deg, #43A6F6 0%, #5868F3 100%)',
      'Upper Body': defaultBackground,
      'Lower Body': defaultBackground,
      Accessory: defaultBackground,
      Hat: defaultBackground,
      Shoes: defaultBackground,
    };
    return categoryBackground[cat];
  };

  return (
    <div className={styles.nftContainer}>
      <div
        className={styles.nftPicture}
        style={{
          background: renderCategoryBackground(product.category),
        }}
      >
        <div className={styles.ntfCategoryLike}>
          <span className={styles.nftCategory}>{product.category}</span>
          <Image
            src={product.isFavorite ? heartPurple : heart}
            className={styles.nftLike}
            alt="nft favorite"
          ></Image>
        </div>
        <Image
          src={renderNftImage(product.imageId)}
          alt="nft Image"
          className={styles.nftImage}
        ></Image>
      </div>
      <div className={styles.nftDetail}>
        <div className={styles.titleAndPrice}>
          <span className={styles.title}>{product.title}</span>
          <span className={styles.price}>
            <Image
              src={logoEth}
              alt="Etherium"
              style={{ marginRight: '8px' }}
            ></Image>
            {product.price} ETH
          </span>
        </div>
        <div className={styles.creator}>
          <div className={styles.creatorAvatar}>
            <img
              src={author.avatar}
              alt="nft creator"
              className={styles.avatar}
            ></img>
            <Image
              src={isOnline ? onlineIcon : offlineIcon}
              className={styles.status}
              alt="author status"
            ></Image>
          </div>
          <div className={styles.creatorName}>{fullName}</div>
        </div>
      </div>
    </div>
  );
}

export function NFTCardSkeleton() {
  return (
    <div className={styles.nftContainer}>
      <div className={styles.nftPicture}>
        <div className={styles.skeletonImage}></div>
      </div>
      <div className={styles.nftDetail}>
        <div className={styles.titleAndPrice}>
          <Skeleton.Button
            active
            className={styles.title}
            size="small"
            style={{ maxWidth: '50px' }}
          ></Skeleton.Button>
          <Skeleton.Button
            active
            className={styles.price}
            size="small"
          ></Skeleton.Button>
        </div>
        <div className={styles.creator}>
          <div>
            <Skeleton.Avatar active shape="circle"></Skeleton.Avatar>
          </div>
          <Skeleton.Button
            className={styles.creatorName}
            size="small"
          ></Skeleton.Button>
        </div>
      </div>
    </div>
  );
}
