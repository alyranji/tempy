import { ReactNode } from "react";

import { SearchNormal1 } from "iconsax-reactjs";

import { Button } from "../button/button";

import styles from "./search.module.css";

function Search(): ReactNode {
  return (
    <div className={styles.search}>
      <SearchNormal1 className={styles.icon} />

      <input type="text" placeholder="جستجو در میان هزاران وبسایت آماده ..." />

      <Button className={styles.btn} size="lg" variant="animate">
        جستجو ...
      </Button>
    </div>
  );
}

export default Search;
