import cn from "classnames";
import styles from "./Collections.module.sass";
import Collection from "./Collection";
import { useSelector } from "react-redux";
import { selectDiscoverCollectionData } from "~/reducers/collectionSlice";

type CollectionsProps = {
  scrollToRef: any;
};

const Collections = ({ scrollToRef }: CollectionsProps) => {
  const activityCollections = useSelector(selectDiscoverCollectionData);

  return (
    <div className={styles.collections} ref={scrollToRef}>
      <div className={styles.head}>
        <div className={cn("h1", styles.title)}>Most activity collections</div>
      </div>
      <div className={styles.list}>
        {activityCollections.map((collection, index) => (
          <Collection
            className={styles.collection}
            item={collection}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Collections;
