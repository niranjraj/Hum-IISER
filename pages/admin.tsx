import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import SideNav from "../components/SideNav";
import prisma from "../utils/prismaInit";
import { MdPending } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import moment from "moment";
import Image from "next/image";
import DateRangePicker from "../components/DateRangePicker";
const Admin: NextPage = (props) => {
  const [currentlist, setCurrentList] = useState(props.activeData);

  const dateFormatter = (date: string) => {
    return moment(date.split("T")[0], "YYYY-MM-DD").format("DD MMM YYYY");
  };
  return (
    <div className="admin-container">
      <SideNav />
      <div className="admin-content-wrapper">
        <div className="filter-wrapper">
          <DateRangePicker setOrder={setCurrentList} />
        </div>
        <div className="admin-order-list-wrapper">
          <div className="admin-order-list">
            <div className="admin-order-list-heading">
              <div className="admin-list-select-all">
                <input type="checkbox" name="selectAll" id="selectAll" />
              </div>

              <div className="admin-header-order-id">#</div>
              <div className="admin-header-order-status">status</div>
              <div className="admin-header-client-name">Client</div>
              <div className="admin-header-issue-date">issued Date</div>
              <div className="admin-header-phone">Phone Number</div>
              <div className="admin-header-store">stores</div>
            </div>
            <ul className="admin-order-list-content">
              {currentlist &&
                currentlist.map((item, index) => {
                  return (
                    <div key={item.id} className="admin-order-list-item">
                      <div className="admin-order-item-select">
                        <input
                          type="checkbox"
                          name={`${item.name}`}
                          id={`${index}-${item.name}`}
                        />
                      </div>
                      <div className="admin-order-id">{`${item.id.slice(
                        0,
                        6
                      )}...`}</div>
                      <div className="admin-order-status">
                        {item.active ? <MdPending /> : <AiFillCheckCircle />}
                      </div>
                      <div className="admin-client-name">{item.name}</div>
                      <div className="admin-issue-date">
                        {dateFormatter(item.createdAt)}
                      </div>
                      <div className="admin-phone">{item.phoneNumber}</div>
                      <div className="admin-store">
                        {item.category.map((item) => {
                          return (
                            <Image
                              key={item}
                              src={`/static/${item}.png`}
                              width="32"
                              height="32"
                              alt={item}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </ul>
            <div className="admin-order-list-footer">
              <div className="admin-order-list-pagination">
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  //   const session = await getSession(context);

  let activeData: any = [];

  const activeOrder = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,

    include: {
      orderItem: {
        select: {
          name: true,
          quantity: true,
          store: true,
        },
      },
    },
  });
  activeData = activeOrder;

  activeData = activeData.map((item) => {
    return { ...item, createdAt: JSON.stringify(item.createdAt) };
  });

  return {
    props: { activeData },
  };
};
export default Admin;
