import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/app.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
import Loader from "../../components/Loader";
import { useAuthContext } from "../../context";
import { useRouter } from "next/router";

const VerifyCertificate = () => {
  const router = useRouter();

  const hash = router.query.hashId;

  const { address, Contract, IsOrg, loading } = useAuthContext();

  const [Loading, setLoading] = useState(false);

  const [verified, setVerified] = useState(Boolean);
  const [result, setResult] = useState([]);

  const Verify = async (hash: string | string[] | undefined) => {
    try {
      setLoading(true);
      const data = await Contract?.call("VerifyCertificate", [hash]);
      setVerified(data[0]);
      setResult(data[1]);
      setLoading(false);
      console.log(data[0]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!verified) Verify(hash);
  }, [hash, []]);

  return (
    <div>
      {(Loading || loading) && <Loader props={"Verify"} />}

      <div className={styles.container}>
        <Navbar></Navbar>
        {verified && (
          <div className={styles.form}>
            <h1 className={styles.title}>Result</h1>

            <label>Is Verified</label>
            <p>{verified.toString()}</p>
            <label>Hash</label>
            <p>{result[2]}</p>

            <label>Address</label>
            <p>{result[0]}</p>

            <label>Name</label>
            <p>{result[5]}</p>

            <label>Certificate Title</label>
            <p>{result[3]}</p>

            <label>Certificate Description</label>
            <p>{result[4]}</p>
          </div>
        )}

        {!verified && (
          <div className={styles.form}>
            <h1 className={styles.title}>Result</h1>

            <label>Is Verified</label>
            <p>{verified.toString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyCertificate;