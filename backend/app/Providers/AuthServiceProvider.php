<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //

        // Register the 'doctor' guard
        // Auth::extend('doctor', function ($app, $name, array $config) {
        //     // Return an instance of your custom guard, e.g. DoctorGuard
        //     return new DoctorGuard(Auth::createUserProvider($config['provider']), $app['request']);
        // });
    }
}
