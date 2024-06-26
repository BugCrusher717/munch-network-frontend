import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import styles from "./Information.module.sass";
import Field from "~/components/Field";
import { useSelector } from "react-redux";
import { selectUser } from "~/reducers/authSlice";

interface InformationProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  bio: string;
  setBio: Dispatch<SetStateAction<string>>;
  website: string;
  setWebsite: Dispatch<SetStateAction<string>>;
  twitter: string;
  setTwitter: Dispatch<SetStateAction<string>>;
  facebook: string;
  setFacebook: Dispatch<SetStateAction<string>>;
}

const Information = ({
  email,
  setEmail,
  name,
  setName,
  bio,
  setBio,
  website,
  setWebsite,
  twitter,
  setTwitter,
  facebook,
  setFacebook,
}: InformationProps) => {
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.bio) setBio(user.bio);
    if (user.name) setName(user.name);
    if (user.email) setEmail(user.email);
  }, [user, setBio, setName, setEmail]);

  return (
    <div className={styles.information}>
      <div className={styles.fieldset}>
        <Field
          className={styles.field}
          label="Email"
          icon="email"
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value as string)}
          required
        />
        <Field
          className={styles.field}
          label="Display name"
          icon="profile"
          value={name}
          onChange={(e: any) => setName(e.target.value as string)}
          required
        />
        <Field
          className={styles.field}
          label="Short bio"
          placeholder="About you"
          icon="list-open"
          value={bio}
          onChange={(e: any) => setBio(e.target.value as string)}
          textarea
          required
        />
      </div>
      <div className={styles.label}>links</div>
      <div className={styles.socials}>
        <Field
          className={styles.field}
          label="Website"
          icon="link"
          value={website}
          onChange={(e: any) => setWebsite(e.target.value as string)}
          required
        />
        <Field
          className={styles.field}
          label="Twitter"
          icon="twitter"
          value={twitter}
          onChange={(e: any) => setTwitter(e.target.value as string)}
          required
        />
        <Field
          className={styles.field}
          label="Facebook"
          icon="facebook"
          value={facebook}
          onChange={(e: any) => setFacebook(e.target.value as string)}
          required
        />
      </div>
    </div>
  );
};

export default Information;
