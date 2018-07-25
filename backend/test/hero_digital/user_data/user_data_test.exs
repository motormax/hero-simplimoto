defmodule HeroDigital.UserDataTest do
  use HeroDigital.DataCase

  alias HeroDigital.UserData
  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  describe "personal_data" do
    alias HeroDigital.UserData.PersonalData

    @valid_attrs %{dni: "some dni", last_name: "some last_name", name: "some name", lead_id: nil}
    @invalid_attrs %{dni: nil, last_name: nil, name: nil, lead_id: nil}

    def personal_data_fixture(attrs \\ %{}) do
      {:ok, personal_data} =
        attrs
        |> Enum.into(@valid_attrs)
        |> UserData.create_personal_data()

      personal_data
    end

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      {:ok, lead} = Identity.create_lead(%{:motorcycle_id => motorcycle.id})
      %{lead: lead}
    end

    test "list_personal_data/0 returns all personal_data", %{lead: lead} do
      personal_data = personal_data_fixture(%{lead_id: lead.id})
      assert UserData.list_personal_data() == [personal_data]
    end

    test "create_personal_data/1 with valid data creates a personal_data", %{lead: lead}  do
      valid_attrs = %{@valid_attrs | "lead_id": lead.id}
      assert {:ok, %PersonalData{} = personal_data} = UserData.create_personal_data(valid_attrs)
      assert personal_data.dni == "some dni"
      assert personal_data.last_name == "some last_name"
      assert personal_data.name == "some name"
    end

    test "get_personal_data!/1 returns the personal_data with given id", %{lead: lead} do
      personal_data = personal_data_fixture(%{lead_id: lead.id})
      assert UserData.get_personal_data!(personal_data.id) == personal_data
    end
  end

  describe "email" do
    alias HeroDigital.UserData.Email

    @valid_attrs %{email: "some email", lead_id: nil}
    @invalid_attrs %{email: nil, lead_id: nil}

    def email_fixture(attrs \\ %{}) do
      {:ok, email} =
        attrs
        |> Enum.into(@valid_attrs)
        |> UserData.create_email()

      email
    end

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      {:ok, lead} = Identity.create_lead(%{:motorcycle_id => motorcycle.id})
      %{lead: lead}
    end

    test "create_email/1 with valid data creates a email", %{lead: lead}  do
      valid_attrs = %{@valid_attrs | "lead_id": lead.id}
      assert {:ok, %Email{} = email} = UserData.create_email(valid_attrs)
      assert email.email == "some email"
    end

    test "get_email!/1 returns the email with given id", %{lead: lead} do
      email = email_fixture(%{lead_id: lead.id})
      assert UserData.get_email!(email.id) == email
    end

    test "create_email/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = UserData.create_email(@invalid_attrs)
    end
  end

  describe "phones" do
    alias HeroDigital.UserData.Phone

    @valid_attrs %{phone: "some phone", lead_id: nil}
    @invalid_attrs %{phone: nil, lead_id: nil}

    def phone_fixture(attrs \\ %{}) do
      {:ok, phone} =
        attrs
        |> Enum.into(@valid_attrs)
        |> UserData.create_phone()

      phone
    end

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      {:ok, lead} = Identity.create_lead(%{:motorcycle_id => motorcycle.id})
      %{lead: lead}
    end

    test "list_phones/0 returns all phones", %{lead: lead} do
      phone = phone_fixture(%{lead_id: lead.id})
      assert UserData.list_phones() == [phone]
    end

    test "get_phone!/1 returns the phone with given id", %{lead: lead} do
      phone = phone_fixture(%{lead_id: lead.id})
      assert UserData.get_phone!(phone.id) == phone
    end

    test "create_phone/1 with valid data creates a phone", %{lead: lead} do
      valid_attrs = %{@valid_attrs | "lead_id": lead.id}
      assert {:ok, %Phone{} = phone} = UserData.create_phone(valid_attrs)
      assert phone.phone == "some phone"
    end

    test "create_phone/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = UserData.create_phone(@invalid_attrs)
    end

  end

  describe "addresses" do
    alias HeroDigital.UserData.Address

    @valid_attrs %{
      lead_id: nil,
      complements: "some complements",
      number: "some number",
      postal_code: "some postal_code",
      street: "some street",
      telephone_number: "some telephone_number",
      town: "some town"
    }
    @invalid_attrs %{
      lead_id: nil,
      complements: nil,
      number: nil,
      postal_code: nil,
      street: nil,
      telephone_number: nil,
      town: nil
    }

    def address_fixture(attrs \\ %{}) do
      {:ok, address} =
        attrs
        |> Enum.into(@valid_attrs)
        |> UserData.create_address()

      address
    end

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      {:ok, lead} = Identity.create_lead(%{:motorcycle_id => motorcycle.id})
      %{lead: lead}
    end

    test "list_addresses/0 returns all addresses", %{lead: lead} do
      address = address_fixture(%{lead_id: lead.id})
      assert UserData.list_addresses() == [address]
    end

    test "get_address!/1 returns the address with given id", %{lead: lead} do
      address = address_fixture(%{lead_id: lead.id})
      assert UserData.get_address!(address.id) == address
    end

    test "create_address/1 with valid data creates a address", %{lead: lead} do
      valid_attrs = %{@valid_attrs | "lead_id": lead.id}
      assert {:ok, %Address{} = address} = UserData.create_address(valid_attrs)
      assert address.complements == "some complements"
      assert address.number == "some number"
      assert address.postal_code == "some postal_code"
      assert address.street == "some street"
      assert address.telephone_number == "some telephone_number"
      assert address.town == "some town"
    end

    test "create_address/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = UserData.create_address(@invalid_attrs)
    end

    test "delete_address/1 deletes the address", %{lead: lead} do
      address = address_fixture(%{lead_id: lead.id})
      assert {:ok, %Address{}} = UserData.delete_address(address)
      assert_raise Ecto.NoResultsError, fn -> UserData.get_address!(address.id) end
    end

    test "change_address/1 returns a address changeset", %{lead: lead} do
      address = address_fixture(%{lead_id: lead.id})
      assert %Ecto.Changeset{} = UserData.change_address(address)
    end
  end

end
