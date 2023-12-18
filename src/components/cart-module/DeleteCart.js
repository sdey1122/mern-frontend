import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { startDeleteCart, startGetCart } from "../../actions/cartActions";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";

const StyledDeleteIcon = styled(DeleteIcon)`
  font-size: 2.5rem;
  color: #e74c3c;
  transition: transform 0.3s ease, color 0.3s ease;
`;

const DeleteButton = styled.div`
  cursor: ${({ isDeleting }) => (isDeleting ? "not-allowed" : "pointer")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);

    ${StyledDeleteIcon} {
      color: #c0392b;
      transform: scale(1.1);
    }
  }

  &:active {
    ${StyledDeleteIcon} {
      transform: scale(0.9);
    }
  }

  opacity: ${({ isDeleting }) => (isDeleting ? 0.5 : 1)};
`;

const DeleteCart = (props) => {
  const { productId } = props;

  const customerData = useSelector((state) => state.customer.data);
  const userId = customerData ? customerData._id : null;

  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will remove the product from your cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, remove it!",
      });

      if (result.isConfirmed) {
        await dispatch(startDeleteCart(userId, productId));

        await dispatch(startGetCart(userId));

        Swal.fire(
          "Removed!",
          "The product has been removed from your cart.",
          "success"
        );
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DeleteButton
      isDeleting={isDeleting}
      onClick={isDeleting ? null : handleDelete}
    >
      <StyledDeleteIcon />
    </DeleteButton>
  );
};

export default DeleteCart;
