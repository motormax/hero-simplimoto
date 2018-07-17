defmodule HeroDigital.UserDataTest do
  use HeroDigital.DataCase

  alias HeroDigital.UserData
  alias HeroDigital.Identity

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
      {:ok, lead} = Identity.create_lead()
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
      {:ok, lead} = Identity.create_lead()
      %{lead: lead}
    end

    test "get_email!/1 returns the email with given id", %{lead: lead} do
      email = email_fixture(%{lead_id: lead.id})
      assert UserData.get_email!(email.id) == email
    end

    test "create_email/1 with valid data creates a email", %{lead: lead}  do
      valid_attrs = %{@valid_attrs | "lead_id": lead.id}
      assert {:ok, %Email{} = email} = UserData.create_email(valid_attrs)
      assert email.email == "some email"
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
      {:ok, lead} = Identity.create_lead()
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
end
