// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC_Wqjdfl3OwLSEikE1DA51vPpK06Ub2UM",
  authDomain: "onlinebookingparty.firebaseapp.com",
  projectId: "onlinebookingparty",
  storageBucket: "onlinebookingparty.appspot.com",
  messagingSenderId: "794751056422",
  appId: "1:794751056422:web:5b72ae85c1ded4af4bc4e7",
  measurementId: "G-FE435EL7LK",

  type: "service_account",
  project_id: "onlinebookingparty",
  private_key_id: "0bff0ceb17009e91e405f49d58789895536161ca",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCp8AE13B4Ah+DB\nI/rhTRnX+QsfI4ZS/W9iDZnPKUlA6XeAMj4ZtSYgDD7LoRxdt2FlQEkD3giqzCi2\n2V+/lt/5MTrLqtHL9P1/Y2ii5OnrQLKu1QcI4awsiu84q3ZfvvjbCmw9WD26+46f\nuxyHMVFSAQ+h9rvaePCydHWZ6EEyh8/es+/DhriTS2nlpjLo6ZjB91DelACeWWGH\n6iOZLcQjQBKULSnVPMX9sV0ePuU/1HPS6DFRs6jrYktM8RmG56rjSvdkqXLyH9r5\ntwvgaSfl/PLp7Cb3VFgUBs9BVFc8Jti2TBX3yWP/ho8UZC8C/8avgS+If1uuo9CG\npuATz2OBAgMBAAECggEACDpDhL0MgtARVKiOS/w0pR08qZxJs5jrnJ619K62CjuD\neqR0F0CLAQA2xhsdyXfIcmODZXmJh+NskTXDCf6fB2yXwSabE7nf0BwbA8/7d1Vh\nkU9lEMwETv/HB0Jd79LKL6i4htvP2U62oAsqHW2I12SPwjK086XpWWqECxiQl4ah\njBkhdEXqJ5qGJI1VlFpFtMDiNX4+p+d/GActhryVChbqefKFPSvVj3+dj1VCXUMN\n54OyhR/tnsK2FE7i9EzDC6H6df5T6KmHX874I7cEoJlD3DSK3RTxZEuykOrwYF/6\nLXefeKwr7tzrfkbvonChWUEV5cfBlEnbOpiAWhZGpQKBgQDgr0fZYrmZLF+FIpbk\n0QdUJjjhXNlJvmEd30WtBwL7L/9kXeKGWKp5BLWLTl4yhQcmvovJ+gMfi3XFnNT5\njTrCObxQnbAUHcSXDnkcfxGTb9DcWfO36OjAplwS5lUBGO7n3ukDscXNfnvBFhLp\nmXTdpxCXYWjU2ixY5Fop9rbOOwKBgQDBn1o2YDTsnK5GIzFXej7if56R2KqlmOC0\npnEvqNRk2hV4fV8d0tA0Vo8jTcEYgboV7b88HK0B2y1nBxYiI32uyEtv1f9t6ulr\n/XK0WPBH7S9b6O3HRUx9wK4isI8V+JcuH3N0W4D/YuElCDTg7zWRLlMiNVDUcPPB\nLag1I2tNcwKBgBv41moS52ZRZubtQnnkKBRq2cP8yjRrFi4g4MzExbM96360TYJK\nQZblZjCcpg+GDjjdmgugK4le1F+wwbb7xSfvBinHJ+epORNRQvSwQSDo18jHDheE\nUI3DaE0WDdkgIIYPc1T5adXGfGOyetJIP4tkxCUEhIeTTdgXPb5hr6qHAoGAGGT8\nV7d9U4ZWCq4qbEwRmjXcA6IZte1x+jCyN//8aoxzgg/BqR9DbiStuhP0zSKjEFo4\n6tjuDzrPGJjy9/AiyJ+hqYB7wxyCtkFjb0d5VoaSnfDV7HJVtc5N4j7+eBUu7ve1\ncyaINST/GsxS5TgeNqFwhfHTskBc5azb8X356fMCgYANpFsCA6eUyjgIQIWc2wQ/\nPxV4hVLz0rfS+xkoRMu7cKjT9EGKnF7244adGUMiB7TpgGaGD8xCQ9rZCGxMAwDE\nUvbi7aqhYYP9GAdagnF6d0vGns59Sh24XbruWdvuOlZRKoKkebAeBHOEduxFVv6j\n4o0hC1vl5ZjnmrhM2sUvfQ==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-96yc3@onlinebookingparty.iam.gserviceaccount.com",
  client_id: "106241257540057901425",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-96yc3%40onlinebookingparty.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
