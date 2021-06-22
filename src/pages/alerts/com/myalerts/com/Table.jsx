import * as React from "react";

import * as styles from "./compon1.module.less";

import { useHistory } from 'react-router-dom';

import { Pagination } from "rsuite";

import nothingImg from "@/assets/nothing.png";



const State = ({ state }) => {
  switch (state) {
    case 'APPROVE':
      return <span style={{ color: "#48CACA" }}>Posted</span>;
    case 'APPLY':
      return <span style={{ color: "#F8B000" }}>In Review</span>;
    case 'REJECT':
      return <span style={{ color: "#F34870" }}>Rejected</span>;
  }
};

export default ({ list = [], setPage, pagination }) => {

  let history = useHistory();

  return list.length > 0 ? (
    <>
      <table className={styles.tb}>
        <thead>
          <tr>
            <th style={{ width: "45%" }}>Title</th>
            <th>Time</th>
            <th className="text-center">Status</th>
            <th className="text-right">More</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <p className="text-ellipsis-1">
                    {item.title}
                  </p>
                </td>
                <td>{item.createTime}</td>
                <td className="text-center">
                  <State state={item.status} />
                </td>
                <td className="text-right">
                  {
                    item.status === 'REJECT' ? <div className={styles.btn} onClick={()=>{history.push(`/alerts/updata/${item.id}`)}} >Edit</div> : null
                  }

                  {
                    item.status === 'APPROVE' ? <div className={styles.btn} onClick={()=>{window.open(`/alerts/detail/${item.id}`)}} >Details</div> : null
                  }
                  
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  activePage={pagination.pageIndex}
                  pages={pagination.totalPage}
                  maxButtons={5}
                  onSelect={setPage}
                />
      </div>
    </>
  ) : (
    <div className={styles.nodate}>
      <img src={nothingImg} />
      <span>No record</span>
    </div>
  );
};
