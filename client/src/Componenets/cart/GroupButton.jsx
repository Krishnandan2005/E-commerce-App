import React from "react";
import { ButtonGroup, Button, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateCartQuantity } from "../../redux/actions/cartActions";

const Component = styled(ButtonGroup)`
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  min-width: 42px;
`;

const GroupedButton = ({ item }) => {
  const dispatch = useDispatch();

  const quantity = item?.quantity || 1;

  const handleIncrement = () => {
    dispatch(updateCartQuantity(item.id, quantity + 1));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(updateCartQuantity(item.id, quantity - 1));
    }
  };

  return (
    <Component variant="outlined">
      <StyledButton
        onClick={handleDecrement}
        disabled={quantity <= 1}
      >
        -
      </StyledButton>

      <Button disabled>
        {quantity}
      </Button>

      <StyledButton onClick={handleIncrement}>
        +
      </StyledButton>
    </Component>
  );
};

export default GroupedButton;