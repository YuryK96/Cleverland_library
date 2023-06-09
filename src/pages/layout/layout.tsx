import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { Error } from "../../common/error";
import { Pending } from "../../common/pending";
import {
    getBooksStatus,
    getBookStatus,
    getCategoriesStatus
} from "../../redux-toolkit/books/books-selectos";
import { getCategories } from "../../redux-toolkit/books/books-thunks";
import { StatusRequestEnum } from "../../redux-toolkit/books/books-type";
import { AppDispatch } from "../../redux-toolkit/store";
import { Footer } from "../footer";
import { Header } from "../header";

import s from "./layout.module.scss";
import { useIsAuth } from "../../hooks/is-auth-hook";
import { addedUser } from "../../redux-toolkit/auth/auth-reducer";
import {
    getChangeEstimateStatus,
    getCommentError,
    getCommentStatus
} from "../../redux-toolkit/commenting/comment-selectos";
import {
    getBookingError,
    getBookingStatus,
    getBookingTypeStatus
} from "../../redux-toolkit/booking/booking-selectos";
import { StatusTypeBookingEnum } from "../../redux-toolkit/booking/booking-type";
import {
    getProfileEditStatus,
    getProfileError,
    getProfilePhotoEditStatus,
    getProfileStatus
} from "../../redux-toolkit/profile/profile-selectos";


export const Layout = () => {
    const status = useSelector(getBooksStatus);
    const categoriesStatus = useSelector(getCategoriesStatus);
    const profileStatus = useSelector(getProfileStatus);
    const profilePhotoStatus = useSelector(getProfilePhotoEditStatus);
    const profilEditeStatus = useSelector(getProfileEditStatus);
    const booksStatus = useSelector(getBookStatus);
    const bookingTypeStatus = useSelector(getBookingTypeStatus);
    const changeEstimateStatus = useSelector(getChangeEstimateStatus);
    const bookingStatus = useSelector(getBookingStatus);
    const commentStatus = useSelector(getCommentStatus);
    const commentError = useSelector(getCommentError);
    const profileError = useSelector(getProfileError);
    const bookingError = useSelector(getBookingError);
    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useIsAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (isAuth === false) {
            navigate("/auth");
        }
    }, [isAuth, navigate]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(getCategories());

            // Added user in Store from localStorage
            if (localStorage.getItem("user")) {
                dispatch(addedUser(JSON.parse(localStorage.getItem("user") || "")));
            }
        }
    }, [dispatch]);


    return <section className={s.Layout}>


        {status === StatusRequestEnum.Pending &&
            <Pending /> || booksStatus === StatusRequestEnum.Pending &&
            <Pending /> || categoriesStatus === StatusRequestEnum.Pending &&
            <Pending /> || commentStatus === StatusRequestEnum.Pending &&
            <Pending /> || bookingStatus === StatusRequestEnum.Pending &&
            <Pending /> || profileStatus === StatusRequestEnum.Pending && <Pending />
            || profilEditeStatus === StatusRequestEnum.Pending &&
            <Pending /> || profilePhotoStatus === StatusRequestEnum.Pending &&
            <Pending /> || changeEstimateStatus === StatusRequestEnum.Pending && <Pending />
        }


        {status === StatusRequestEnum.Error &&
            <Error /> || categoriesStatus === StatusRequestEnum.Error &&
            <Error /> || commentStatus === StatusRequestEnum.Success && !commentError &&
            <Error isEstimate={true} isError={false} idError="error" idCross="alert-close"
                   text="Спасибо, что нашли время оценить книгу!"
                   isTimeOut={true} /> || commentStatus === StatusRequestEnum.Error &&
            <Error isEstimate={true} idError="error" idCross="alert-close"
                   text="Оценка не была отправлена. Попробуйте позже!"
                   isTimeOut={true} /> ||

            changeEstimateStatus === StatusRequestEnum.Success && !commentError &&
            <Error isEstimate={true} isError={false} idError="error" idCross="alert-close"
                   text="Спасибо, что нашли время изменить оценку!"
                   isTimeOut={true} /> || changeEstimateStatus === StatusRequestEnum.Error &&
            <Error isEstimate={true} idError="error" idCross="alert-close"
                   text="Изменения не были сохранены. Попробуйте позже!"
                   isTimeOut={true} />


            || bookingStatus === StatusRequestEnum.Success && !bookingError && status === StatusRequestEnum.Success &&
            <Error isEstimate={true} isError={false} idError="error" idCross="alert-close"
                   text={bookingTypeStatus === StatusTypeBookingEnum.changeBooking ? "Изменения успешно сохранены" : bookingTypeStatus === StatusTypeBookingEnum.deleteBooking ? "Бронирование книги успешно отменено!" : "Книга забронирована. Подробности можно посмотреть на странице Профиля"}
                   isTimeOut={true} /> || bookingStatus === StatusRequestEnum.Error && status === StatusRequestEnum.Success &&
            <Error isEstimate={true} idError="error" idCross="alert-close"
                   text={bookingTypeStatus === StatusTypeBookingEnum.changeBooking ? "Изменения не были сохранены. Попробуйте позже" : bookingTypeStatus === StatusTypeBookingEnum.deleteBooking ? "Не удалось снять бронирование книги. Попробуйте позже" : "Что-то пошло не так, книга не забронирована. Попробуйте позже!"}
                   isTimeOut={true} /> || bookingStatus === StatusRequestEnum.Success && !bookingError && status === null &&
            <Error isEstimate={true} isError={false} idError="error" idCross="alert-close"

                   text={bookingTypeStatus === StatusTypeBookingEnum.changeBooking ? "Изменения успешно сохранены" : bookingTypeStatus === StatusTypeBookingEnum.deleteBooking ? "Бронирование книги успешно отменено!" : "Книга забронирована. Подробности можно посмотреть на странице Профиль"}
                   isTimeOut={true} /> || bookingStatus === StatusRequestEnum.Error && status === null &&
            <Error isEstimate={true} idError="error" idCross="alert-close"
                   text={bookingTypeStatus === StatusTypeBookingEnum.changeBooking ? "Изменения не были сохранены. Попробуйте позже" : bookingTypeStatus === StatusTypeBookingEnum.deleteBooking ? "Не удалось снять бронирование книги. Попробуйте позже" : "Что-то пошло не так, книга не забронирована. Попробуйте позже!"}
                   isTimeOut={true} /> || profileStatus === StatusRequestEnum.Error &&
            <Error isEstimate={true} isError={true} idError="error" idCross="alert-close"
                   text="Что-то пошло не так, проверьте профиль позже"
            />
            || profilEditeStatus === StatusRequestEnum.Error &&
            <Error isEstimate={true} isError={true} idError="error" idCross="alert-close"
                   text="Изменения не были сохранены. Попробуйте позже"
            /> || profilEditeStatus === StatusRequestEnum.Success &&
            <Error isEstimate={true} isError={false} idError="error" idCross="alert-close"
                   text="Изменения успешно сохранены!"
            /> || profilePhotoStatus === StatusRequestEnum.Success &&
            <Error isEstimate={true} isError={false} idError="error" idCross="alert-close"
                   text="Фото успешно сохранено"
            /> || profilePhotoStatus === StatusRequestEnum.Error &&
            <Error isEstimate={true} isError={true} idError="error" idCross="alert-close"
                   text="Что-то пошло не так, фото не сохранилось. Попробуйте позже!"
            />


        }


        <Header />

        <div className={s.wrapperContent}>
            <Outlet />
        </div>
        <Footer />
    </section>;
};
