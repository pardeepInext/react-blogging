<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    function login(Request $request)
    {
        $validator = Validator::make($request->input(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) return response()->json(['success' => false, 'error' => $validator->errors()]);

        $user = User::where('email', $request->email)->first();
        if (!$user) return response()->json(['success' => false, 'error' => ['email' => "This email is not matching with our record"]]);
        if (!Hash::check($request->password, $user->password)) return response()->json(['success' => false, 'error' => ['password' => "Password is incorrect"]]);
        $reponse = $user;
        $reponse['token'] = $user->createToken($user->name)->plainTextToken;

        return response()->json(['success' => true, 'user' => $reponse]);
    }

    function register(Request $request)
    {
        $validator = Validator::make($request->input(), [
            'email' => 'required|email',
            'name' => 'required',
            'password' => 'Required|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/'
        ], ['password.regex' =>
        'Password must having atlease one numeric,spacial character,uppercase']);

        if ($validator->fails()) return response()->json(['success' => false, 'error' => $validator->errors()]);

        $user = User::create(['name' => $request->name, 'password' => Hash::make($request->password), 'email' => $request->email]);
        $reponse = $user;
        $reponse['token'] = $user->createToken($user->name)->plainTextToken;

        return response()->json(['success' => true, 'user' => $reponse]);
    }

    function socialAuth(Request $request)
    {

        $user = User::where('provider_id', $request->provider_id)->first();
        if ($user) {
            $user['token'] = $user->createToken($user->name)->plainTextToken;
            return response()->json(['success' => true, 'user' => $user]);
        } else {
            $loginUser = User::create($request->only('name', 'image', 'email', 'provider_id'));
            return response()->json(['success' => false, 'token' => $loginUser->createToken($loginUser->name)->plainTextToken, 'user' => $loginUser]);
        }
    }
}
