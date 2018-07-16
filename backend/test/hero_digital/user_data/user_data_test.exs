defmodule HeroDigital.UserDataTest do
  use HeroDigital.DataCase

  alias HeroDigital.UserData

  describe "personal_data" do

    @valid_attrs %{dni: "some dni", last_name: "some last_name", name: "some name", lead_id: "7488a646-e31f-11e4-aace-600308960662"}

    def personal_data_fixture(attrs \\ %{}) do
      {:ok, personal_data} =
        attrs
        |> Enum.into(@valid_attrs)
        |> UserData.create_personal_data()

      personal_data
    end

    test "list_personal_data/0 returns all personal_data" do
      personal_data = personal_data_fixture()
      assert UserData.list_personal_data() == [personal_data]
    end

    test "get_personal_data!/1 returns the personal_data with given id" do
      personal_data = personal_data_fixture()
      assert UserData.get_personal_data!(personal_data.id) == personal_data
    end
  end

  describe "email" do
    alias HeroDigital.UserData.Email
    alias HeroDigital.Identity

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
end
