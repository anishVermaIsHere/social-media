import { lazy } from "react";


export const Homepage = lazy(()=>import('@/pages/Homepage'));
export const Loginpage = lazy(()=>import('@/pages/Loginpage'));
export const Registerpage = lazy(()=>import('@/pages/Registerpage'));
export const Protected = lazy(()=>import('@/modules/user/components/Protected'));
export const Feed = lazy(()=>import('@/modules/user/components/Feed'));
export const Post = lazy(()=>import('@/modules/user/components/Post'));
export const Layout = lazy(()=>import('@/modules/user/components/Layout'));
export const Profile = lazy(()=>import('@/modules/user/components/Profile'));
export const Create = lazy(()=>import('@/modules/posts/components/Create'));
export const ErrorPage = lazy(()=>import('@/components/Error'));
