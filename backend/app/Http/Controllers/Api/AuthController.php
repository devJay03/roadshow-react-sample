<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\AuthServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    protected $services;

    public function __construct(AuthServices $authServices)
    {
        $this->services = $authServices;
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        try {

            $token = $this->services->login($credentials);

            if (! $token) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            return response()->json([
                'message' => 'Login successful',
                'token'   => $token,
            ], 200);

        } catch (\Throwable $e) {
            Log::error($e);
            return response()->json(['message' => 'Something went wrong. Please try again later.'], 500);
        }

    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        try {
            $this->services->register($data);
            return response()->json([
                'message' => 'Registration Successfull. Please Proceed to Login!',
            ], 201);
        } catch (\Throwable $e) {
            Log::error($e);
            return response()->json(['message' => 'Unable to register. Please try again later.'], 500);
        }

    }

    public function logout(Request $request)
    {
        try {
            $this->services->logout($request);
            return response()->json([
                'message' => 'Successfully logged out',
            ], 200);

        } catch (\Throwable $e) {
            Log::error($e);
            return response()->json(['message' => 'Unable to logout. Please try again later.'], 500);
        }

    }
}
