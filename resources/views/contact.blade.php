@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('contact') }}

        <h1>{{__('app.contact')}}</h1>
        <h2>Contacter l'administrateur du site</h2>
        <p>L'application Hello World a été développée par <a href="https://chloecorfmat.fr">Chloé Corfmat</a> (promotion Enssat IMR 2019). Vous pouvez la contacter par <a href="mailto:hello-world@chloecorfmat.space">e-mail (hello-world@chloecorfmat.space)</a></p>
        <p>Elle est votre contact privilégié pour tout échange technique notamment sur les sujets suivants :</p>
        <ul class="default-style">
            <li>Question et/ou problème technique</li>
            <li>Proposition d'améliorations du site</li>
            <li><span class="emphasis">etc.</span></li>
        </ul>

        <h2>Contacter un référent pédagogique</h2>
        <p>Pour toute question d'ordre pédagogique, vous pouvez contacter par e-mail <a href="mailto:aurelien.moreau@enssat.fr">Aurélien MOREAU (aurelien.moreau@enssat.fr)</a> et/ou <a href="mailto:claire.le-page@enssat.fr">Claire LE PAGE (claire.le-page@enssat.fr)</a>.</p>
        <p>Ils sont les contacts privilégiés sur les sujets suivants :</p>
        <ul class="default-style">
            <li>Questions liées aux résultats et aux explications d'un exercice</li>
            <li>Inscription aux examens officiels</li>
            <li>Ouverture d'un nouveau compte sur la plateforme</li>
            <li>Affectation dans un groupe</li>
            <li><span class="emphasis">etc.</span></li>
        </ul>
    </div>
@endsection
