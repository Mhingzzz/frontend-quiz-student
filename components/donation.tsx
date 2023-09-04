"use client"
// import { API_URL } from "../utils/api";
// import { type Donation } from "@/utils/types";
import { Paper, Text, Stack, Group, Title, Card } from "@mantine/core";
import dayjs from "dayjs";
import {FC} from "react";

import axios from "axios";
import {useQuery} from "@tanstack/react-query"
export default function Donation() {

  const { data } = useQuery(['donations'], async () => {
  const response = await axios.get(
    "https://donation-server-production.up.railway.app/donation"
  );
  return response.data;
});

  //  console.log( data)
   const totalAmount = data
  ? data.reduce((total: any, item: any) => total + item.amount, 0)
  : 0; // ให้ค่าเริ่มต้นเป็น 0 หาก data ไม่ถูกกำหนดค่า

   
  return (
    
   <Card withBorder shadow="xs" bg="gray.3">
    <Group mb={20}>
      <Title order={1} color="gray">
        Total
      </Title>
      <Title order={1} variant="gradient">
        {totalAmount}
      </Title>
      <Title order={1} color="gray">
        THB
      </Title>
    </Group>
    <Stack>
      {data
        ? data.map((item: any) => (
            <Paper key={item.id} shadow="xs" p="md">
              <Group>
                <Text>{item.firstName}</Text>
                <Text>{item.lastName}</Text>
                <Text>{item.email}</Text>
                <Text>{item.amount}</Text>
                <Text>
                  {dayjs(item.time).format('D-MMM HH:mm:ss')}
                </Text>
              </Group>
            </Paper>
          ))
        : <div>No data available</div> // แสดงข้อความถ้า data ไม่มีค่า
      }
    </Stack>
  </Card>
  );
}
