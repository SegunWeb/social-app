import React, {useState} from 'react';
import s from "./paginator.module.css";
// import cn from "classnames"

const Paginator = ({currentPage, onPageChanged, pageSize, totalItemsCount, portionSize = 10}) => {


    let pagesCount = Math.ceil( totalItemsCount / pageSize);
    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return(
        <div className={s.wrapper}>
            { portionNumber > 1 &&
                <button onClick={() => {setPortionNumber(portionNumber -1)}}>Prev</button> }
            <div className={s.selectedPage}>
            {pages
                .filter(p => p>= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                return <span
                key={p}
                className={currentPage === p && s.pageActive}
                onClick={(e) => {onPageChanged(p)}}
                >{p}</span>
            })}
                </div>

            { portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber +1)}}>Next</button> }

        </div>
    )
};

export default Paginator;