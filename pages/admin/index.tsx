import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SideNav from "../../components/SideNav";
import prisma from "../../utils/prismaInit";
import { MdPending } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import moment from "moment";
import Image from "next/image";
import DateRangePicker from "../../components/DateRangePicker";
import { wrapper } from "../../redux/store";

import { useAppSelector, useAppDispatch } from "../../redux/redux-hook";
import { Field, Form, Formik } from "formik";
import {
  setAdminCount,
  setAdminOrder,
  setSelectedOrder,
} from "../../redux/order-slice";
import { category } from "../../utils/initialValues";

import Link from "next/link";
import Router, { useRouter } from "next/router";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const initialValue = {
  dateRange: [null, null],
  category: "",
};

interface adminQuery {
  dateRange: Date[] | null[];
  category: string;
}
const Admin: NextPage = (props) => {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const [checkAll, setCheckAll] = useState(false);
  const [modal, setModal] = useState(false);
  const currentList = useAppSelector((state) => state.order.adminOrder);
  const adminOrderCount = useAppSelector((state) => state.order.adminCount);
  const selectedOrder = useAppSelector((state) => state.order.selectedOrder);
  console.log(selectedOrder);
  const dispatch = useAppDispatch();

  const dateFormatter = (date: string) => {
    return moment(date.split("T")[0], "YYYY-MM-DD").format("DD MMM YYYY");
  };
  const handleSelectAll = () => {
    setCheckAll((prev) => !prev);
    dispatch(setSelectedOrder(currentList.map((li) => li.id)));

    if (checkAll) {
      dispatch(setSelectedOrder([]));
    }
  };
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedOrder([...selectedOrder, e.target.id]));
    if (!e.target.checked) {
      dispatch(
        setSelectedOrder(selectedOrder.filter((item) => item !== e.target.id))
      );
    }
  };
  const handleSelected = async (handleKey: string) => {
    if (selectedOrder.length < 1) {
      return;
    } else {
      const res = await fetch("http://localhost:3000/api/order/active", {
        body: JSON.stringify({ selectedOrder, selected: handleKey }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 200) {
        dispatch(setSelectedOrder([]));
      }
      const response = await res.json();
    }
  };

  const handleRequest = async (values: adminQuery) => {
    try {
      const res = await fetch("http://localhost:3000/api/order/admin", {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      console.log(`response:${response}`);
      dispatch(setAdminOrder(response.newOrder));
      dispatch(setAdminCount(response.count));
      console.log(currentList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (values: adminQuery) => {
    console.log("in submit");
    handleRequest(values);
  };
  if (session && session?.user?.role == "user") {
    router.push("/");
  }
  if (session && session?.user?.role == "admin") {
    return (
      <div className="admin-container">
        <SideNav />
        <div className="admin-content-wrapper">
          {modal && (
            <div className="modal-wrapper">
              <div className="modal-container">
                <h3>Confirm payment for this Order?</h3>

                <div>
                  <button
                    className="confirm-paid-btn"
                    onClick={() => handleSelected("payment")}
                  >
                    Paid
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="filter-wrapper">
            <Formik initialValues={initialValue} onSubmit={handleSubmit}>
              {({ values }) => (
                <Form className="admin-filter-options">
                  <DateRangePicker name="dateRange" />
                  <Field
                    as="select"
                    name="category"
                    // onChange={() => handleSubmit(values)}
                  >
                    <option value="" label="Select a store">
                      Select a store
                    </option>
                    {category.map((item, index) => (
                      <option
                        key={`${item}-${index}`}
                        value={item}
                        label={item}
                      >
                        {item}
                      </option>
                    ))}
                  </Field>
                  <div className="admin-order-button-wrapper">
                    <button type="submit">Filter</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="admin-order-list-wrapper">
            <div className="admin-order-list">
              <div className="admin-order-list-heading">
                <div className="admin-list-select-all">
                  <input
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    onChange={handleSelectAll}
                  />
                </div>

                <div className="admin-header-order-id">#</div>
                <div className="admin-header-order-status">status</div>
                <div className="admin-header-client-name">Client</div>
                <div className="admin-header-issue-date">issued Date</div>
                <div className="admin-header-phone">Phone Number</div>
                <div className="admin-header-store">stores</div>
              </div>
              <ul className="admin-order-list-content">
                {currentList &&
                  currentList.map((item, index) => {
                    return (
                      <div key={item.id} className="admin-order-list-item">
                        <div className="admin-order-item-select">
                          <input
                            type="checkbox"
                            name={`${item.name}`}
                            id={item.id}
                            checked={selectedOrder.includes(item.id)}
                            onChange={(e) => handleCheck(e)}
                          />
                        </div>
                        <div className="admin-order-id">{`${item.id.slice(
                          0,
                          6
                        )}...`}</div>
                        <div className="admin-order-status">
                          {item.active ? (
                            <MdPending
                              style={{ color: "rgba(255, 135, 0, 0.5)" }}
                            />
                          ) : (
                            <AiFillCheckCircle
                              style={{ color: "rgba(51, 214, 159, 0.5)" }}
                            />
                          )}
                        </div>
                        <div className="admin-client-name">{item.name}</div>
                        <div className="admin-issue-date">
                          {dateFormatter(item.createdAt)}
                        </div>
                        <div className="admin-phone">{item.phoneNumber}</div>
                        <div className="admin-store">
                          <Image
                            src={`/static/${item.category}.png`}
                            width="32"
                            height="32"
                            alt={item.category}
                          />
                        </div>
                        <div className="admin-link">
                          <Link href={`/admin/${item.id}`}>
                            <a>
                              <BsFillArrowRightCircleFill />
                            </a>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </ul>
              <div className="admin-order-list-footer">
                <div className="admin-order-count">
                  <p>
                    Order count: <span>{adminOrderCount}</span>
                  </p>
                </div>
                <div className="admin-order-button-wrapper">
                  <button onClick={() => setModal(true)}>Payment</button>
                  <button onClick={() => handleSelected("confirm")}>
                    confirm
                  </button>
                </div>
                <div className="admin-order-list-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

// export const getServerSideProps = async () => {
//   let activeData: any = [];

//   const activeOrder = await prisma.order.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//     take: 10,

//     include: {
//       orderItem: {
//         select: {
//           name: true,
//           quantity: true,
//           store: true,
//         },
//       },
//     },
//   });
//   activeData = activeOrder;

//   activeData = activeData.map((item) => {
//     return { ...item, createdAt: JSON.stringify(item.createdAt) };
//   });

//   return {
//     props: { activeData },
//   };
// };

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);

    let activeData: any = [];
    if (session && session.user?.email) {
      const activeOrder = await prisma.order.findMany({
        orderBy: {
          createdAt: "desc",
        },

        take: 12,
        include: {
          orderItem: {
            select: {
              name: true,
              quantity: true,
              unit: true,
              store: true,
            },
          },
        },
      });
      const activeOrderCount = await prisma.order.aggregate({
        _count: true,
      });
      activeData = activeOrder.map(({ userId, createdAt, ...rest }) => {
        return { ...rest, createdAt: JSON.stringify(createdAt) };
      });

      store.dispatch(setAdminOrder(activeData));
      store.dispatch(setAdminCount(activeOrderCount._count));
    }

    return {
      props: {},
    };
  }
);
export default Admin;
