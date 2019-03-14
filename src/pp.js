//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function jmolIsReady()
{
		//alert("JSmol Ready");
	initpp();
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
var rotateplus = "rotateBranch(20);"; // CALL A JSMOL FUNCTION
var rotateminus = "rotateBranch(-20);";

// These scripts color the phi or psi bond green, and the other one white.

var rotatephi =
'rbranch = "phi";\n\
select 1.1 and (16.n,16.ca);\n\
color bond [x80ff80];\n\
select 1.1 and (16.ca,16.c);\n\
color bond white;\n\
';

var rotatepsi =
'rbranch = "psi";\n\
select 1.1 and (16.ca,16.c);\n\
color bond [x80ff80];\n\
select 1.1 and (16.n,16.ca);\n\
color bond white;\n\
';

// DESIGN OF rotate_branch(delta)
// Rotation is 10 steps, so for delta 20 degrees, 10 x 2 degree steps.
// PLANES
// After rotating 1 step (2 deg), new plane is drawn and THEN previous plane is deleted.
// I did this because I feared that if a single plane were deleted prior to rotation and
// re-drawn after rotation, the planes would "jitter" (disappear and reappear) and I wanted
// a smooth-looking rotation of the planes. An alternative would be to use atommovedCallback.
// Or to simply re-draw the plane in the same ID name after rotation, which probably would
// have been equally satisfactory and much simpler but I didn't try that.

//console\n\
//set debugscript true\n\
//javascript alert("jrotate loading")\n\

function initpp()
{
	// define JSmol functions
	jmolScript("script /wiki/Tutorial/Ramachandran_principle_and_phi_psi_angles/setup.spt;");

	// The RESET button does a simple reload (from cache).
	// SIMPLE RELOAD NEEDS TO RESTORE INITIAL FORM STATE
//	alert(document.getElementById("ppradioid_0"));
	// check Phi
	document.getElementById("ppradioid_0").checked = true;
	// uncheck all checkboxes
	document.getElementById("idalanine").checked = false;
	document.getElementById("idpeptidebonds").checked = false;
	document.getElementById("idplanes").checked = false;
	document.getElementById("idvdw").checked = false;
	document.getElementById("idwhite").checked = false;
	document.getElementById("idclashes").checked = false;
	document.getElementById("idtrailclashes").checked = false;

	//jmolScript("preload();"); // SEEMED TO DO NO GOOD

	// comment out rocking to debug
	jmolScript("rockModel();");

	var cmd = "clashesOrange = ";
	if (clashesOrange)
		cmd += "true";
	else
		cmd += "false";
	jmolScript(cmd);
}

// These scripts color the peptide bonds, or uncolor them.

var pepcolor = 
'select *.c,*.n;\n\
color bonds [xff80ff];'; // light magenta

var pepnocolor = 
'select *.c,*.n;\n\
color bonds white;';

var peplabel = '<font color="#ff40ff">Peptide Bonds</font>';

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function doAlanine()
{
	if (document.getElementById("idalanine").checked)
		jmolScript("dotAlanine()");
	else
		jmolScript("select 16;dots off;");
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function doPeptideBonds()
{
	if (document.getElementById("idpeptidebonds").checked)
		jmolScript(pepcolor);
	else
		jmolScript(pepnocolor);
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function doPlanes()
{
	if (document.getElementById("idplanes").checked)
		jmolScript("renderPlanes()");
	else
		jmolScript("draw * delete;showPlanes = false;");
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function doVDW()
{
	if (document.getElementById("idvdw").checked)
	{
		jmolScript("vdwTranslucent()");
		document.getElementById("divwhite").style.display = ""; // visible
	}
	else
	{
		jmolScript("frame 1;background [xd0d0d0];zoomto 1.0 150;showVDW = false;setQuality();");
		document.getElementById("idwhite").checked = false;
		document.getElementById("divwhite").style.display = "none";
	}
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function doWhite()
{
	if (document.getElementById("idwhite").checked)
	{
		jmolScript("background white;select 1.2;color white translucent 6;");
	}
	else
	{
		jmolScript("select 1.2;color cpk;color translucent 4;background [xd0d0d0]");
	}
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function doClashes()
{
	if (document.getElementById("idclashes").checked)
	{
		jmolScript("renderClashes(999);");
		if (offerTrail)
			document.getElementById("divtrailclashes").style.display = ""; // visible
	}
	else
	{
		jmolScript("contact delete;showClashes = false;trailClashes = false;setQuality();");
		document.getElementById("divtrailclashes").style.display = "none";
		document.getElementById("idtrailclashes").checked = false;
	}
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function doTrailClashes()
{
	if (document.getElementById("idtrailclashes").checked)
	{
		jmolScript("trailClashes = true;setQuality();");
		//		document.getElementById("idclashes").checked = true;
	}
	else
	{
		jmolScript("contact delete;trailClashes = false;setQuality();");
		document.getElementById("idclashes").checked = false;
		document.getElementById("divtrailclashes").style.display = "none";
	}
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function doRadio()
{
	if (document.getElementById("ppradioid_0").checked)
	{
		jmolScript(rotatephi);

		document.getElementById("idrcont1").style.color = "#a0a0a0";
		document.getElementById("idrcont1").style.fontWeight = "normal";
		document.getElementById("idrcont0").style.color = "#00c800";
		document.getElementById("idrcont0").style.fontWeight = "bold";

		document.getElementById("psiangle").style.fontWeight = "normal";
		document.getElementById("psiangle").style.color = "#a0a0a0";
		document.getElementById("phiangle").style.fontWeight = "bold";
		document.getElementById("phiangle").style.color = "#00c800";
	}
	else
	{
		jmolScript(rotatepsi);

		document.getElementById("idrcont0").style.color = "#a0a0a0";
		document.getElementById("idrcont0").style.fontWeight = "normal";
		document.getElementById("idrcont1").style.color = "#00c800";
		document.getElementById("idrcont1").style.fontWeight = "bold";

		document.getElementById("phiangle").style.fontWeight = "normal";
		document.getElementById("phiangle").style.color = "#a0a0a0";
		document.getElementById("psiangle").style.fontWeight = "bold";
		document.getElementById("psiangle").style.color = "#00c800";
	}
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// JSmol code for draw and contact are not loaded until needed. There is a delay when first
// used, so this is an attempt to force them to preload.

/*
function preload()
{
	jmolScript("renderPlanes();draw * delete;showPlanes = false;");
	jmolScript("renderClashes(999);contact delete;showClashes = false;");
}
*/
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function checkBrowser()
{
	// MSIE
	if (match(navigator.userAgent, "trident") &&
		match(navigator.platform, "win"))
		document.getElementById("divmsie").style.display = ''; // see toggleDivVisibility(divid) below

	// EDGE
	if (match(navigator.userAgent, "edge"))
		document.getElementById("divedge").style.display = '';
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function match(name, subname)
{
	//  alert("util.js #2 match:\n" + name + "\n" + subname);
	if (name.toLowerCase().indexOf(subname.toLowerCase()) == -1)
		return false;
	return true;
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function toggleDivVisibility(divId)
{
	if (document.getElementById(divId).style.display == 'none')
		document.getElementById(divId).style.display = '';
	else
		document.getElementById(divId).style.display = 'none';
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
