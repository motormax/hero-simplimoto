defmodule HeroDigitalWeb.InsuranceQuoteChosenController do
  # use HeroDigitalWeb, :controller

  # alias HeroDigital.Insurance
  # alias HeroDigital.Insurance.InsuranceQuoteChosen

  # action_fallback HeroDigitalWeb.FallbackController

  # def index(conn, _params) do
  #   insuarnce_quotes_chosen = Insurance.list_insuarnce_quotes_chosen()
  #   render(conn, "index.json", insuarnce_quotes_chosen: insuarnce_quotes_chosen)
  # end

  # def create(conn, %{"insurance_quote_chosen" => insurance_quote_chosen_params}) do
  #   with {:ok, %InsuranceQuoteChosen{} = insurance_quote_chosen} <- Insurance.create_insurance_quote_chosen(insurance_quote_chosen_params) do
  #     conn
  #     |> put_status(:created)
  #     |> put_resp_header("location", insurance_quote_chosen_path(conn, :show, insurance_quote_chosen))
  #     |> render("show.json", insurance_quote_chosen: insurance_quote_chosen)
  #   end
  # end

  # def show(conn, %{"id" => id}) do
  #   insurance_quote_chosen = Insurance.get_insurance_quote_chosen!(id)
  #   render(conn, "show.json", insurance_quote_chosen: insurance_quote_chosen)
  # end

  # def update(conn, %{"id" => id, "insurance_quote_chosen" => insurance_quote_chosen_params}) do
  #   insurance_quote_chosen = Insurance.get_insurance_quote_chosen!(id)

  #   with {:ok, %InsuranceQuoteChosen{} = insurance_quote_chosen} <- Insurance.update_insurance_quote_chosen(insurance_quote_chosen, insurance_quote_chosen_params) do
  #     render(conn, "show.json", insurance_quote_chosen: insurance_quote_chosen)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   insurance_quote_chosen = Insurance.get_insurance_quote_chosen!(id)
  #   with {:ok, %InsuranceQuoteChosen{}} <- Insurance.delete_insurance_quote_chosen(insurance_quote_chosen) do
  #     send_resp(conn, :no_content, "")
  #   end
  # end
end
