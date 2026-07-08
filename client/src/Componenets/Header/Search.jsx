import { Box, InputBase, List, ListItem, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";

const SearchContainer = styled(Box)`
  background: #ffffff;
  width: 38%;
  height: 36px;
  margin-left: 10px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchIconWrapper = styled(Box)`
  color: #2874f0;
  padding: 0 10px;
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;

  & svg {
    font-size: 20px;
  }
`;

const StyledInputBase = styled(InputBase)`
  width: 100%;

  & input {
    font-size: 14px;
    padding: 8px 0 8px 10px;
  }
`;

const ListWrapper = styled(List)`
  position: absolute;
  top: 36px;
  left: 0;
  width: 100%;
  background: #fff;
  color: #000;
  z-index: 1000;
`;

const Search = () => {
  const [text, setText] = useState("");
  const { products } = useSelector((state) => state.getProducts);
  const dispatch = useDispatch();

  const getText = (value) => {
    setText(value);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <SearchContainer>
      <StyledInputBase
        placeholder="Search for Products, Brands and more"
        onChange={(e) => getText(e.target.value)}
        value={text}
      />

      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      {text && (
        <ListWrapper>
          {products
            .filter((product) =>
              product.title.longTitle
                .toLowerCase()
                .includes(text.toLowerCase())
            )
            .map((product) => (
              <ListItem key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  onClick={() => setText("")}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {product.title.longTitle}
                </Link>
              </ListItem>
            ))}
        </ListWrapper>
      )}
    </SearchContainer>
  );
};

export default Search;