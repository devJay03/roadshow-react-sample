<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthServices
{
    public function login(array $credentials)
    {
        $user = User::where('email', $credentials['email'])->first();
        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return null;
        }

        return $user->createToken('api-token')->plainTextToken;

    }

    public function register(array $data)
    {
        return User::create([
            'email'    => $data['email'],
            'name'     => $data['name'],
            'password' => $data['password'],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

    }
}
