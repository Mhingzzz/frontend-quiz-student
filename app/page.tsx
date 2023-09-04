"use client";
import Donation from "../components/donation";
import Form from "../components/form";
import Name from "../components/name";
import { Container, Stack } from "@mantine/core";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
export default function Home() {
  const queryclient = new QueryClient();
  return (

    <QueryClientProvider client={queryclient}>
      <Container size="sm" mt={"sm"}>
        <Stack spacing={"xl"}>
          <Name />
          <Form />
          <Donation />
        </Stack>
      </Container>
    </QueryClientProvider>
  );
}
