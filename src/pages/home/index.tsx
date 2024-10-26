import {
  Card,
  Col,
  Row,
  Typography,
  Image,
  Button,
  Divider,
  Input,
} from "antd";
import { useEffect, useState } from "react";
import { LuFileSearch } from "react-icons/lu";
import { getBooks } from "../../../service";
import { showNotification } from "../../components/general/notification";
import { CHANGED } from "../../../redux/constants";
import { useDispatch, useSelector } from "react-redux";

const { Paragraph, Text } = Typography;

const Home = (props: any) => {
  const [books, setBooks] = useState<any>(undefined);
  const [searched, setSearched] = useState([]);
  const [basket, setBasket] = useState([]);
  const dispatch = useDispatch();
  const globalState: any = useSelector((state) => state);

  const handleBooks = async () => {
    const response = await getBooks();
    setBooks(response);
    setSearched(response);
  };

  const handleInput = (event: any) => {
    const val = event.target.value;
    const tempArr = books?.filter((obj: any) =>
      obj.name.toLowerCase().includes(val.toLowerCase(), 0)
    );

    setSearched(tempArr);
  };

  const addBasket = (obj: any) => {
    const tempArr: any = [...basket];
    tempArr.push(obj);
    dispatch({
      type: CHANGED,
      state: { basket: tempArr }
    });
    setBasket(tempArr);
  };

  useEffect(() => {
    handleBooks();
  }, []);

  useEffect(() => {
    if (globalState.codexist) {
      setBasket(globalState.codexist.state.basket);
    }
  }, [globalState]);

  const BookCard = () => {
    return searched?.map((obj: any, index: number) => (
      <Col key={index} md={12} lg={8} xxl={6}>
        <Card
        extra={<Text type="success">{obj.price} TL</Text>}
          hoverable
          title={<Text ellipsis>{obj.name}</Text>}
          cover={
            <Image
              width={"50%"}
              style={{ marginLeft: 70, marginRight: 70 }}
              preview={false}
              src={obj.image}
            />
          }
        >
          <Paragraph>{obj.shortDescription}</Paragraph>

          <div style={{ textAlign: "right" }}>
            <Text strong>{obj.author}</Text>
          </div>
          <Divider />

          <Row gutter={[12, 36]}>
            <Col span={12}>
              <Button onClick={() => addBasket(obj)} block>
                Add Shopping{" "}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                block
                onClick={() =>
                  showNotification("info", obj.name, obj.description, null)
                }
              >
                Detail
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    ));
  };

  return (
    <Card>
      <Input
        allowClear
        onChange={handleInput}
        size="large"
        prefix={<LuFileSearch size={20} />}
      />
      <Divider />
      <Row align={"top"} gutter={[24, 36]}>
        {BookCard()}
      </Row>
    </Card>
  );
};

export default Home;
