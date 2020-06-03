import React from 'react';
import s from "./paginator.module.css";


const Paginator = ({currentPage, onPageChanged, pageSize, totalUsersCount}) => {


    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i=1; i <= pageCount; i++) {
        pages.push(i)
    }


    return(
        <div className={s.wrapper}>
            <div className={s.selectedPage}>
                {pages.map(p => {
                    return <span
                        key={p}
                        className={currentPage === p && s.pageActive}
                        onClick={(e) => {onPageChanged(p)}}
                    >{p}</span>
                })}
            </div>
        </div>
    )
};

export default Paginator;