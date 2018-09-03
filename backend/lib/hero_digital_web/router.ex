defmodule HeroDigitalWeb.Router do
  use HeroDigitalWeb, :router
  use ExAdmin.Router
  use Plug.ErrorHandler
  if Mix.env == :prod do
    use Sentry.Plug
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug BasicAuth, use_config: {:hero_digital, :basic_auth}
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  if Mix.env == :dev do
    forward "/sent_emails", Bamboo.SentEmailViewerPlug
  end

  scope "/admin", ExAdmin do
    pipe_through :browser
    admin_routes()
  end

  # Other scopes may use custom stacks.
  scope "/api", HeroDigitalWeb do
    pipe_through :api
    resources "/personal_data", PersonalDataController, only: [:create, :show]
    resources "/email", EmailController, only: [:create, :show]
    resources "/phone", PhoneController, only: [:create, :show]
    get "/plate_registration_types", PlateRegistrationTypeController, :index

    resources "/leads", LeadController, only: [:create, :show] do
      get "/delivery_choice", DeliveryChoiceController, :show
      post "/delivery_choice", DeliveryChoiceController, :create
      get "/addresses", AddressController, :index

      post "/plate_registration", PlateRegistrationDataController, :create
      get "/plate_registration", PlateRegistrationDataController, :show

      post "/financing_data", FinancingDataController, :create
      get "/financing_data", FinancingDataController, :show

      post "/date_appointment", DateAppointmentController, :create
      get "/date_appointment", DateAppointmentController, :show

      get "/purcharse_order", PurchaseOrderController, :show
      post "/purcharse_order", PurchaseOrderController, :create

      get "/insurance_quotes", InsuranceController, :quote
      get "/insurance", InsuranceChoiceController, :show
      post "/insurance", InsuranceChoiceController, :create

      get "/accessories", AccessoryController, :index
      post "/accessory", AccessoryController, :create
      get "/accessory/:id", AccessoryController, :show
      delete "/accessory/:id", AccessoryController, :delete
    end


    match :*, "/*path", StaticFilesController, :not_found
  end

  # We respond to every other request with the react index since it's probably a react route.
  scope "/", HeroDigitalWeb do
    get "/*path", StaticFilesController, :static
  end
end
