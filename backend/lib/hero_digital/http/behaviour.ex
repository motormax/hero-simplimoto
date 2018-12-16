defmodule Http.Behaviour do
  @typep url     :: binary()
  @typep body    :: {:form, [{atom(), any()}]}
  @typep headers :: Keyword.t()
  @typep options :: Keyword.t()

  @callback post(url, body, headers) :: {:ok, map()} | {:error, binary() | map()}
  @callback post(url, body, headers, options) :: {:ok, map()} | {:error, binary() | map()}
  @callback get(url, headers) :: {:ok, map()} | {:error, binary() | map()}
  @callback get(url, headers, options) :: {:ok, map()} | {:error, binary() | map()}
end
