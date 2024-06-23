import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import {useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { setUser } = useAuth();
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem('user');
    (token)? setUser(token) : router.replace('/Login');

      // Initialize user context with the authenticated user based on the token
  },[])
  return (
    <Layout>
      <div className="bg-image">
        <div className="welcome-text">
          <h1>Welcome to my CoffeeShop</h1>
        </div>
      </div>
    </Layout>
  );
}
